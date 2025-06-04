import React from 'react';
import { useContext } from 'react';
import { INote } from '../models';

export interface ISelectedNoteContextType {
  filteredNotes: string;
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string | null) => void;
  note: INote | undefined,
  setFilteredNotes: (id: string) => void;
}

export const SelectedNoteContext = React.createContext<ISelectedNoteContextType>({
  filteredNotes: '',
  selectedNoteId: null,
  setSelectedNoteId: () => {},
  note: undefined,
  setFilteredNotes: () => {},
});

export const useSelectedNote = ():ISelectedNoteContextType => {
  const context = useContext(SelectedNoteContext);
  if (!context) {
    throw new Error('useSelectedNote must be used within a SelectedNoteProvider');
  }
  return context;
};