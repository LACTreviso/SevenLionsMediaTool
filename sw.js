const C="slt-v1",A=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
const keep=n=>{if(n.ok&&(n.type==="basic"||r.url.includes("fonts.g"))){const cp=n.clone();caches.open(C).then(c=>c.put(r,cp))}return n};
if(r.mode==="navigate")e.respondWith(fetch(r).then(keep).catch(()=>caches.match("./index.html")));
else e.respondWith(caches.match(r).then(h=>h||fetch(r).then(keep)))});
