// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Your Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyCxvql0r_aeerphxTA0UUedRppdBxGf7wo",
  authDomain: "prayer-dome.firebaseapp.com",
  projectId: "prayer-dome",
  storageBucket: "prayer-dome.firebasestorage.app",
  messagingSenderId: "198295153196",
  appId: "1:198295153196:web:1222b31948d7974ba3bf89",
  measurementId: "G-0TGGMYR9NF"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('📨 Received background message:', payload);

  // Customize notification
  const notificationTitle = payload.notification?.title || 'Prayer Dome';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message',
    icon: payload.notification?.icon || 'https://i.ibb.co/TB5Fx4tb/logo-0.png',
    badge: 'https://i.ibb.co/TB5Fx4tb/logo-0.png',
    vibrate: [200, 100, 200],
    tag: 'prayer-dome-notification',
    renotify: true,
    data: payload.data || {},
    actions: [
      {
        action: 'open',
        title: 'Open Prayer Dome'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notification clicked:', event);
  
  event.notification.close();
  
  // Handle action buttons
  if (event.action === 'close') {
    return;
  }
  
  // Open the app
  const urlToOpen = event.notification.data?.url || 'https://prayerdome1.netlify.app';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        // Check if there's already a window/tab open with the target URL
        for (let client of windowClients) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // If not, open a new window/tab
        return clients.openWindow(urlToOpen);
      })
  );
});

// Handle service worker installation
self.addEventListener('install', (event) => {
  console.log('✅ Service Worker installed');
  self.skipWaiting();
});

// Handle service worker activation
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activated');
  return self.clients.claim();
});