// Imports
const functions = require("firebase-functions");
const admin = require('firebase-admin');
// Initialization
admin.initializeApp();

// Functions
// Add Player
exports.addPlayer = functions.https.onCall(async (data, context) => {
   const player = { 
      name: data.name, 
      password: data.password,
      guesses: {},
      level: 0
   };
   // Push the message into Firestore using the Firebase Admin SDK.
   const writeResult = await admin.firestore().collection('players').add(player);

   // Send back a message id
   return { playerId: writeResult.id };
});

exports.getImg = functions.https.onCall(async (data, context) => {

   const player = await admin.firestore().collection('players').doc(data.playerId).get();
   const playerLev = player.data().level;
   if (playerLev === 3) {
      await admin.firestore().collection('players').doc(player.id).set({ level: player.data().level - 1 }, { merge: true });
      return { imageUrl: false };
   }
   
   const imgData = await admin.firestore().collection('gameData').get();
   let imgInfo;
   imgData.forEach(doc => imgInfo = doc.data());

   return {
      imageUrl: imgInfo[playerLev.toString()].url,
      charsList: imgInfo[playerLev.toString()].chars.map(char => char.name),
      level: playerLev
   }
});

exports.checkPoint = functions.https.onCall(async (data, context) => {
   
   const player = await admin.firestore().collection('players').doc(data.playerId).get();
   if (player.data().level === 0) startTimer();

   let allGuesses = player.data().guesses;
   let prevLevGuesses = allGuesses['level' + player.data().level];
 
   if (prevLevGuesses === undefined) {
      allGuesses['level' + player.data().level] = [];
      await admin.firestore().collection('players').doc(player.id).set({ guesses: allGuesses }, { merge: true });
      prevLevGuesses = [];
   } else if(prevLevGuesses.includes(data.name)) {
      return { result : "old", validChars: prevLevGuesses };
   }
   
   let charsLocations, allImageInfo;
   const allimgData = await admin.firestore().collection('gameData').get();
   allimgData.forEach(doc => {
      allImageInfo = doc.data();
      charsLocations = doc.data()[player.data().level.toString()]
   });
   
   const charLocation = charsLocations.chars.find(char => data.name === char.name);
   
   const pointer = { x: data.pointerX, y: data.pointerY };
   
   if (  pointer.x > charLocation.left
      && pointer.x < charLocation.right
      && pointer.y > charLocation.top
      && pointer.y < charLocation.bottom
      ){
         prevLevGuesses.push(data.name);
         allGuesses['level' + player.data().level] = prevLevGuesses
         await admin.firestore().collection('players').doc(player.id).set({ guesses: allGuesses }, { merge: true });
         if (prevLevGuesses.length === charsLocations.chars.length){
            if (player.data().level === Object.keys(allImageInfo).length - 1) stopTimer();
            await admin.firestore().collection('players').doc(player.id).set({ level: player.data().level + 1 }, { merge: true });
            return { result : "complete", validChars: prevLevGuesses }
         } else {
         return { result : "partial", validChars: prevLevGuesses };
      }
   }
   else return { validChars: prevLevGuesses };

   async function startTimer(){
      await admin.firestore().collection('players').doc(player.id)
      .set({ startTime: new Date().getTime() }, { merge: true });      
   }
   async function stopTimer(){
      const record = new Date().getTime() - player.data().startTime;
      await admin.firestore().collection('players').doc(player.id)
      .set({ record }, { merge: true });
   }

});

exports.getScores = functions.https.onCall(async (data, context) => {
   const allplayers = await admin.firestore().collection('players').orderBy('record', 'desc').get();

   let scores = [];
   allplayers.forEach(player => {
         scores.push({ 
            name: player.data().name,
            record: player.data().record, 
            isPlayer: player.id === data.playerId ? true : false 
         })
   });

   return { scores };
});
