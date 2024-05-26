const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.createLobby = functions.https.onCall(async (data, context) => {
  const generateLobbyKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  let key;
  let exists = true;

  while (exists) {
    key = generateLobbyKey();
    const querySnapshot = await db.collection('lobby').where('key', '==', key).get();
    if (querySnapshot.empty) {
      exists = false;
    }
  }

  await db.collection('lobby').add({
    key: key,
    createdAt: new Date(),
  });

  return { key: key };
});
