import { INote } from '@/models';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const saveNote = async (note: INote) => {
  const docRef = await addDoc(collection(db, 'notes'), note);
  return { id: docRef.id };
};

export const updateNoteInDb = async (id: string, content: string) => {
  const noteRef = doc(db, 'notes', id);
  await updateDoc(noteRef, { content });
};

export const deleteNoteFromDb = async (id: string) => {
  const noteRef = doc(db, 'notes', id);
  await deleteDoc(noteRef);
};

export const fetchNotes = async (userId: string) => {
  const q = query(collection(db, 'notes'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as INote[];
};

export { signInWithEmailAndPassword, createUserWithEmailAndPassword, app, auth, db };