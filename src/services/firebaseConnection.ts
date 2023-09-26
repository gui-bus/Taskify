import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB62z2TVDOr5MQrg1AfuJWpf1HlUfjXBes",
  authDomain: "taskify-14e38.firebaseapp.com",
  projectId: "taskify-14e38",
  storageBucket: "taskify-14e38.appspot.com",
  messagingSenderId: "91019870694",
  appId: "1:91019870694:web:8e78d78b93e294571f9627",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
