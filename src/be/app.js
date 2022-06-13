import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, doc } from "firebase/firestore/lite";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyB7HLxxSKU907yUD83cvxhsuFyDFUU6WE0",
  authDomain: "where-s-waldo-d05b1.firebaseapp.com",
  projectId: "where-s-waldo-d05b1",
  storageBucket: "where-s-waldo-d05b1.appspot.com",
  messagingSenderId: "980037915774",
  appId: "1:980037915774:web:43c8b22d5728e73ff4f42f"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);

if (process.env.NODE_ENV === 'development') connectFunctionsEmulator(functions, "localhost", 5001);

async function getData(docName = "users/QD9h69CLPIM0r4sQgGnt"){
   const infoCol = doc(db, docName);
   const infoSnapShot = await getDoc(infoCol);
   let infoList = infoSnapShot.data()
   
   return infoList;
}


async function getDataSimple(collectionName = "users"){
   const info = doc(db, collectionName)
   
   return info;
}

export default getData;
export { functions };