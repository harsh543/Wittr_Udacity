self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/skeleton'));
      return;
    }
    if (requestUrl.pathname.startsWith('/photos/')) {
      event.respondWith(servePhoto(event.request));
      return;
    }
    if (requestUrl.pathname.startsWith('/avatars/')) {
      event.respondWith(serveAvatar(event.request));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

function serveAvatar(request) {
  var storageUrl = request.url.replace(/-\dx\.jpg$/, '');

  return caches.open(contentImgsCache).then(function(cache) {
    return cache.match(storageUrl).then(function(response) {
      var networkFetch = fetch(request).then(function(networkResponse) {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });

      return response || networkFetch;
    });
  });
}

function servePhoto(request) {
  var storageUrl = request.url.replace(/-\d+px\.jpg$/, '');

  return caches.open(contentImgsCache).then(function(cache) {
    return cache.match(storageUrl).then(function(response) {
      if (response) return response;

      return fetch(request).then(function(networkResponse) {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});


  // Example 1
   // Tell browser we will handle this event ouselves.
   // event.respondWith takes a repsonse object or a promise that resolve with a repsonse
   /*
   event.respondWith(
       // can take blob, buffer string or other data
       new Response('Hello <b class="a-winner-is-me">World!</b>', {
           // change the headers and content type
           headers: { 'Content-Type': 'text/html; charset=utf-8' }
       })       
   );
   */
  
   // Example 2
   // respond to request if ends in .jpg
/*
   if ( event.request.url.endsWith('.jpg') ) {
        // Fetch an image with fetch API
        event.respondWith(
            fetch('/imgs/dr-evil.gif')
        );
    }
*/

    // Example 3
    // event.respondWith(
    //     fetch(event.request).then(function(response) {
    //         if(response.status == 404) {
    //             return new Response('Whoops, not found');
    //         }
    //         return response;
    //     }).catch(function(){
    //         return new Response("Totally failed");
    //     })
    // );

 //   console.log(event.request);

   // Example 2
   // respond to request if ends in .jpg

 /*  if ( event.request.url.endsWith('.jpg') ) {
        // Fetch an image with fetch API
        event.respondWith(
            fetch('/imgs/dr-evil.gif')
        );
    }
   event.respondWith(
        fetch(event.request).then(function(response) {
            if(response.status == 404) {
                return fetch('/imgs/dr-evil.gif');
            }
            return response;
        }).catch(function(){
            return new Response("Totally failed");
        })
    );*/
   /* Example 3
    event.respondWith(
        fetch(event.request).then(function(response) {
            if(response.status == 404) {
                return new Response('Whoops, not found');
            }
            return response;
        }).catch(function(){
            return new Response("Totally failed");
        })
    );*/



    //console.log(event.request);

/*self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/skeleton',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ]);
    })
  );
});
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wittr-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});*/

// respond to a fetch/request

 
