// import { firebase } from "@firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
 

 apiKey: "AIzaSyALSwdIzupuPCzUShuS0f3HWCe8hpgtxYY",
  authDomain: "doll-b99f0.firebaseapp.com",
  projectId: "doll-b99f0",
  storageBucket: "doll-b99f0.appspot.com",
  messagingSenderId: "44063803972",
  appId: "1:44063803972:web:f98d41cc18d478c9858a11",
  measurementId: "G-XTFBS0N6MP"


};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

export default auth;

// export { auth };
