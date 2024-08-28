"use client";

import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import firebaseApp from "../../firebase";
import useFcmToken from "../../hooks/useFcmToken";

export default function Home() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      console.log("🚀 ~ useEffect ~ fcmToken:", fcmToken);
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [fcmToken]);
  return <div>Home</div>;
}
