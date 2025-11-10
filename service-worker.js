// Service Worker para modo offline - Estrategia App Shell
const CACHE_VERSION = 'ph041-v2';
const CACHE_NAME = `seguros-bolivar-${CACHE_VERSION}`;
const RUNTIME_CACHE = `seguros-bolivar-runtime-${CACHE_VERSION}`;

// Archivos del app shell a precachear
const PRECACHE_FILES = [
  './',
  './index.html',
  './offline.html',
  './styles.css',
  './ui.js',
  './manifest.json',
  './assets/logo_SB.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Instalación: precachear app shell
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando versión', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precacheando app shell');
        return cache.addAll(PRECACHE_FILES.map(url => new Request(url, {cache: 'reload'})));
      })
      .catch((err) => {
        console.error('[SW] Error al precachear:', err);
        // No fallar la instalación si algunos archivos fallan
      })
  );
  // Activar inmediatamente sin esperar a que se cierren las pestañas
  self.skipWaiting();
});

// Activación: limpiar caches antiguos y tomar control
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando versión', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Eliminar caches que no sean de la versión actual
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE && 
              cacheName.startsWith('seguros-bolivar-')) {
            console.log('[SW] Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Tomar control inmediato de todas las pestañas
  return self.clients.claim();
});

// Manejar mensajes del cliente (para actualización)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Saltando espera y activando nueva versión');
    self.skipWaiting();
  }
});

// Estrategia de fetch: diferentes para diferentes tipos de recursos
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin) {
    return; // Dejar que el navegador maneje requests de otros orígenes
  }
  
  // Estrategia para documentos HTML (navegación)
  if (request.destination === 'document' || request.mode === 'navigate') {
    event.respondWith(networkFirstStrategy(request));
    return;
  }
  
  // Estrategia para recursos estáticos (CSS, JS, imágenes)
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image' ||
      request.destination === 'manifest') {
    event.respondWith(staleWhileRevalidateStrategy(request));
    return;
  }
  
  // Para otros recursos, intentar cache primero
  event.respondWith(cacheFirstStrategy(request));
});

// Network-first para documentos: intentar red, si falla usar cache, si no hay cache → offline.html
function networkFirstStrategy(request) {
  return fetch(request)
    .then((response) => {
      // Si la respuesta es válida, cachearla y devolverla
      if (response && response.status === 200) {
        const responseToCache = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(request, responseToCache);
        });
        return response;
      }
      throw new Error('Respuesta inválida');
    })
    .catch(() => {
      // Si falla la red, intentar desde cache
      return caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        // Si es una navegación y no hay cache, devolver offline.html
        if (request.destination === 'document' || request.mode === 'navigate') {
          return caches.match('./offline.html');
        }
        // Para otros casos, devolver respuesta vacía
        return new Response('Sin conexión', { status: 503, statusText: 'Service Unavailable' });
      });
    });
}

// Stale-while-revalidate para estáticos: servir cache inmediatamente y actualizar en segundo plano
function staleWhileRevalidateStrategy(request) {
  return caches.open(RUNTIME_CACHE).then((cache) => {
    return cache.match(request).then((cachedResponse) => {
      // Actualizar en segundo plano
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      }).catch(() => {
        // Si falla la actualización, ignorar (ya tenemos cache)
      });
      
      // Devolver cache inmediatamente si existe, sino esperar la red
      return cachedResponse || fetchPromise;
    });
  });
}

// Cache-first para otros recursos: servir desde cache, si no existe buscar en red
function cacheFirstStrategy(request) {
  return caches.match(request).then((cachedResponse) => {
    if (cachedResponse) {
      return cachedResponse;
    }
    return fetch(request).then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        const responseToCache = networkResponse.clone();
        caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(request, responseToCache);
        });
      }
      return networkResponse;
    }).catch(() => {
      // Si falla todo, devolver respuesta vacía
      return new Response('Recurso no disponible', { status: 404 });
    });
  });
}
