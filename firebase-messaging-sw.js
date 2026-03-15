// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCxvql0r_aeerphxTA0UUedRppdBxGf7wo",
  authDomain: "prayer-dome.firebaseapp.com",
  projectId: "prayer-dome",
  storageBucket: "prayer-dome.firebasestorage.app",
  messagingSenderId: "198295153196",
  appId: "1:198295153196:web:1222b31948d7974ba3bf89"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'Prayer Dome';
  const notificationOptions = {
    body: payload.notification?.body || 'New update from Prayer Dome',
    icon: payload.notification?.icon || 'https://i.ibb.co/TB5Fx4tb/logo-0.png',
    badge: 'https://i.ibb.co/TB5Fx4tb/logo-0.png',
    vibrate: [200, 100, 200],
    data: payload.data,
    actions: [
      {
        action: 'open',
        title: 'View'
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
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('https://prayerdome1.netlify.app')
    );
  }
});