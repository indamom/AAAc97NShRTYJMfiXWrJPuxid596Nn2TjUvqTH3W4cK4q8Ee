import { db } from '../../lib/firebase-config';

export default async function handler(req, res) {
  if (req.method === 'POST') {
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

    res.status(200).json({ key });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
