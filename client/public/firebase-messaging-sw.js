importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js')
firebase.initializeApp({
  apiKey: "AIzaSyDWpFnrWm7Fu9OjUlyhkyO5YsrN2DvVwKU",
  authDomain: "hosting-node-d1622.firebaseapp.com",
  projectId: "hosting-node-d1622",
  storageBucket: "hosting-node-d1622.appspot.com",
  messagingSenderId: "641723765727",
  appId: "1:641723765727:web:12f884b419d8fa531a6a6a",
  measurementId: "G-44JWR9SPDZ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: './logo.png',
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
