import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { fetchNotes, saveNote, updateNoteInDb, deleteNoteFromDb } from '../firebase';
import { Note } from '../types';

interface INotesProviderProps {
  children: React.ReactNode
}

interface NotesContextType {
  notes: Note[];
  filteredNotes: Note[];
  setFilteredNotes: (notes: Note[]) => void;
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string | null) => void;
  addNote: (note: Note) => Promise<void>;
  updateNote: (id: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

export const NotesContext = createContext<NotesContextType>({
  notes: [],
  filteredNotes: [],
  setFilteredNotes: () => { },
  selectedNoteId: null,
  setSelectedNoteId: () => { },
  addNote: async () => { },
  updateNote: async () => { },
  deleteNote: async () => { },
});

export const NotesProvider = ({ children }: INotesProviderProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const fetchUserNotes = async () => {
    if (!auth.currentUser) return;
    const fetchedNotes = await fetchNotes(auth.currentUser.uid);
    setNotes(fetchedNotes);
    setFilteredNotes(fetchedNotes); // По умолчанию показываем все заметки
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchUserNotes();
    }
  }, [auth.currentUser]);

  const addNote = async (note: Note) => {
    const newNote = { ...note, userId: auth.currentUser!.uid };
    await saveNote(newNote);
    setNotes((prev) => [...prev, { ...newNote, id: Date.now().toString() }]);
  };

  const updateNote = async (id: string, content: string) => {
    await updateNoteInDb(id, content);
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, content } : note))
    );
  };

  const deleteNote = async (id: string) => {
    await deleteNoteFromDb(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        filteredNotes,
        setFilteredNotes,
        selectedNoteId,
        setSelectedNoteId,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
