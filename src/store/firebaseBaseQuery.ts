import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { app } from '../../firebase'; 
import { INote } from '../models';
const db = getFirestore(app);

type QueryConfig =
  | { method: 'GET'; url: string; body: { userId: string } }
  | { method: 'GET'; url: string; body: { noteId: string }}
  | { method: 'POST'; url: string; body: Partial<INote> }
  | { method: 'PATCH'; url: string; body: Partial<INote> & { id: string } }
  | { method: 'DELETE'; url: string; body: { id: string } };

export const firebaseBaseQuery = () =>
  async ({ method, url, body }: QueryConfig) => {
    try {
        switch (method) {
          case 'GET': {
            if (body && 'noteId' in body) {
              const q = query(collection(db, url), where('id', '==', body.noteId));
              const querySnapshot = await getDocs(q);
              const notes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as INote[];
              return { data: notes[0] };
            } else if (body && 'userId' in body) {
              const q = query(collection(db, url), where('userId', '==', body.userId));
              const querySnapshot = await getDocs(q);
              const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as INote[];
              return { data };
            } else {
              throw new Error('Invalid GET request configuration');
            }
          }
          case 'POST': {
            const docRef = await addDoc(collection(db, url), body);
            return { data: { id: docRef.id, ...(body as Partial<INote>) } };
          }
          case 'PATCH': {
            const { id, ...patchData } = body as { id: string } & Partial<INote>;
            await updateDoc(doc(db, url, id), patchData);
            return { data: { id, ...patchData } };
          }
          case 'DELETE': {
            const q = query(collection(db, url), where('id', '==', (body as { id: string }).id));
            const querySnapshot = await getDocs(q);
            const docId = querySnapshot.docs[0].id;
            await deleteDoc(doc(db, url, docId));
            return { data: null };
          }
          default:
            throw new Error('Unsupported method');
        }
    } catch (error) {
      return { error: { message: (error as Error).message } };
    }
  };