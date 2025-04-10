import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { saveNote, fetchNotes, updateNoteInDb, deleteNoteFromDb } from '../../firebase';
import { INote } from '../models';

export const useNotes = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

  const fetchUserNotes = async () => {
    if (!auth.currentUser) return;
    const fetchedNotes = await fetchNotes(auth.currentUser.uid);
    setNotes(fetchedNotes);
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchUserNotes();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]);

  const addNote = async (note: INote) => {
    const newNote = { ...note, userId: auth.currentUser!.uid };
    const { id } = await saveNote(newNote);
    setNotes((prev) => [...prev, { ...newNote, id }]);
    fetchUserNotes();
  };
  
  const updateNote = async (id: string, content: string) => {
    await updateNoteInDb(id, content);
    setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, content } : note)));
    fetchUserNotes();
  };

  const deleteNote = async (id: string) => {
    await deleteNoteFromDb(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
    fetchUserNotes();
  };

  return {
    fetchUserNotes,
    notes,
    selectedNoteId,
    setSelectedNoteId,
    selectedNote,
    addNote,
    updateNote,
    deleteNote,
  };
};