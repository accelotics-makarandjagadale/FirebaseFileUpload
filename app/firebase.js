// app/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyj8fk6X9h4WSOA8HxiWa8dmlQCRJDgDA",
  authDomain: "fir-fileupload-91828.firebaseapp.com",
  projectId: "fir-fileupload-91828",
  storageBucket: "fir-fileupload-91828.appspot.com",
  messagingSenderId: "493038097912",
  appId: "1:493038097912:web:424f559f5f1d90d595320d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
