import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_APIKEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
//   projectId: process.env.NEXT_PUBLIC_STORAGEBUCKET,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
//   appId: process.env.NEXT_PUBLIC_APPID
// };
const firebaseConfig = {
  apiKey: "AIzaSyDqY1Dj5LH2MTls2L4erwiglow1Z6u9KaE",
  authDomain: "pan-shop-16a86.firebaseapp.com",
  projectId: "pan-shop-16a86",
  storageBucket: "pan-shop-16a86.appspot.com",
  messagingSenderId: "729956048420",
  appId: "1:729956048420:web:0a5b656991a50af34dc2b1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export  {db ,auth, storage};