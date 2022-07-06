import { loader, displayChart, playWaldo } from "./functionalities";

import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator, collection, addDoc, doc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, connectStorageEmulator } from "firebase/storage";

// import { connectFunctionsEmulator } from "firebase/functions";
// import { connectFirestoreEmulator, collection, addDoc, doc } from "firebase/firestore";
// import { connectStorageEmulator } from "firebase/storage";

// Initialization
const firebaseApp = initializeApp({
   apiKey: "AIzaSyDbSowFllmvUcRcUw8xmyVLtbCdd5PX9XQ",
   authDomain: "functions-eca1e.firebaseapp.com",
   projectId: "functions-eca1e",
   storageBucket: "functions-eca1e.appspot.com",
   messagingSenderId: "166059777718",
   appId: "1:166059777718:web:ac11cd1bbae50157cc5017"
});

const db = getFirestore();
const functions = getFunctions(firebaseApp);
const storage = getStorage(firebaseApp);

// connectFirestoreEmulator(db, 'localhost', 8080);
// connectFunctionsEmulator(functions, "localhost", 5001);
// connectStorageEmulator(storage, 'localhost', 9199);
// document.getElementById('upload').addEventListener('click', async () => {
//   const data = require('./be/db.json');
//   const dataRef = await addDoc(collection(db, "gameData"), data);
//   console.log('uploaded', dataRef.id);
// })

// Let's Go

const addPlayer = httpsCallable(functions, 'addPlayer');
loader(addPlayer, mainGame);

function mainGame(playerId) {
   const getImg = httpsCallable(functions, 'getImg');
   const checkPoint = httpsCallable(functions, 'checkPoint');

   const endBtn = document.getElementById('end-header');
   endBtn.addEventListener('click', () => endGame(playerId));
   endButton.textContent = "END GAME";
   
   document.querySelector('section').className = 'playing';
   playWaldo(playerId, getImg, loadImg, checkPoint, endGame);
}

async function endGame(playerId) {
   // TODO : remove all setintervals
   document.querySelectorAll('header>nav>span').forEach(el => el.style.display = 'none');
   document.getElementById('chars-list').textContent = '';
   document.querySelector('section').classList.remove('playing');
   document.querySelector('#welcome').style.display = 'block';
   document.querySelector('#welcome').textContent = 'Chart';
   document.querySelector('main img').setAttribute('src', '');

   const getScores = httpsCallable(functions, "getScores");

   await displayChart(playerId, getScores);

   const restart = document.createElement('button');
   document.querySelector('header').appendChild(restart);
   restart.textContent = "RESTART";
   restart.addEventListener('click', () => location.reload())
}

async function loadImg(data) {
   const continentRef = ref(storage, 'images/' + data.imageUrl);
   const chars = data.charsList;

   const url = await getDownloadURL(continentRef);
   const img = document.querySelector('img');
   img.setAttribute('src', url);
   img.setAttribute('alt', data.imageUrl)

   return chars;
}

