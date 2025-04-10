import { initializeApp } from 'firebase/app';
import { INote } from './src/models';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDYTpTgjcsWONFmHZxIBmLU154aHIJKuPA',
  authDomain: 'notes-app-97094.firebaseapp.com',
  projectId: 'notes-app-97094',
  storageBucket: 'notes-app-97094.firebasestorage.app',
  messagingSenderId: '926490439495',
  appId: '1:926490439495:web:c8f368ddd27ff4f499a662',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

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

export { signInWithEmailAndPassword, createUserWithEmailAndPassword, app };