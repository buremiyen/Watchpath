const CACHE='watchpath-v2';
const OLD_CACHES=['watchpath-v1'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['/'])).catch(()=>{}))});
self.addEventListener('activate',event=>{event.waitUntil(Promise.all(OLD_CACHES.map(name=>caches.delete(name))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;event.respondWith(fetch(event.request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{})}return response}).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('/'))))});
