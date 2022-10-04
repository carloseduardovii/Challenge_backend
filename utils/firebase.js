const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');
const dotenv = require('dotenv');

dotenv.config({ path: './set.env' });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: "challenge-backend-3a90a.firebaseapp.com",
  projectId: process.env.FIREBASE_PROYECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE,
  // messagingSenderId: "944647853818",
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { storage };
