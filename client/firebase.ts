import { initializeApp } from "firebase/app";
import "firebase/messaging";
import firebaseConfig from "./firebase-config";

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
