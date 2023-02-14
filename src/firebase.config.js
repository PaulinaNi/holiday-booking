import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyC0Zvf4zaqcMXPbmt_2yXWqUpYqJutzwek",
 authDomain: "holiday-booking-ef5ad.firebaseapp.com",
 projectId: "holiday-booking-ef5ad",
 storageBucket: "holiday-booking-ef5ad.appspot.com",
 messagingSenderId: "947676290223",
 appId: "1:947676290223:web:b670f28b135cc675c6085a",
 measurementId: "G-4BETREHEXQ"
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)