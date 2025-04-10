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
  | { method: 'POST'; url: string; body: Partial<INote> }
  | { method: 'PATCH'; url: string; body: Partial<INote> & { id: string } }
  | { method: 'DELETE'; url: string; body: { id: string } };

export const firebaseBaseQuery = () =>
  async ({ method, url, body }: QueryConfig) => {
    try {
        switch (method) {
          case 'GET': {
            const q = query(collection(db, url), where('userId', '==', (body as { userId: string }).userId));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as INote[];
            return { data };
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
            await deleteDoc(doc(db, url, (body as { id: string }).id));
            return { data: null };
          }
          default:
            throw new Error('Unsupported method');
        }
    } catch (error) {
      return { error: { message: (error as Error).message } };
    }
  };