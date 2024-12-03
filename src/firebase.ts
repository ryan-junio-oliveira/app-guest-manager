import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD10qT8rPa9tZRbhcp1JgeerLTRVTcJBb4",
    authDomain: "app-guest-manager.firebaseapp.com",
    projectId: "app-guest-manager",
    storageBucket: "app-guest-manager.firebasestorage.app",
    messagingSenderId: "1028033254873",
    appId: "1:1028033254873:web:04cee27e4bbedf65e9b5c8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
