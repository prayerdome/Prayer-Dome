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
  console.log('📨 Background message received:', payload);
  
  const notificationTitle = payload.notification?.title || 'Prayer Dome';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new notification',
    icon: payload.notification?.icon || 'https://i.ibb.co/TB5Fx4tb/logo-0.png',
    badge: 'https://i.ibb.co/TB5Fx4tb/logo-0.png',
    vibrate: [200, 100, 200],
    data: payload.data || {},
    tag: 'prayer-dome-notification',
    renotify: true
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});