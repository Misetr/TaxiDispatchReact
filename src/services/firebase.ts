import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(config);
const db = getFirestore(app);
const col = collection(db, 'dispatches');

export async function saveRecord(rec:any){ await addDoc(col, rec); }
export async function loadRecords(){ const snap = await getDocs(col); return snap.docs.map(d=>d.data()); }
