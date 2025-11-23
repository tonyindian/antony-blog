/**
 * Service Worker Registration
 * Registers the service worker for offline functionality
 */
(function() {
  'use strict';

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker
        .register('/sw.js')
        .then(function(registration) {
          console.log('ServiceWorker registered:', registration.scope);
        })
        .catch(function(error) {
          console.error('ServiceWorker registration failed:', error);
        });
    });
  }
})();
