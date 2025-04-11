import React, { useState } from 'react';
import { ISelectedNoteContextType, SelectedNoteContext } from '../../../hooks/useSelectNote';
import { useGetNoteByIdQuery } from '../../../store/notesApi';

interface ISelectedNoteProviderProps {
    children: React.ReactNode
}

export const SelectedNoteProvider = ({ children }: ISelectedNoteProviderProps) => {

  const [filteredNotes, setFilteredNotes] = useState<string>('');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const { data: note } = useGetNoteByIdQuery(selectedNoteId as string);  

  const value: ISelectedNoteContextType = {
    filteredNotes,
    selectedNoteId,
    setSelectedNoteId,
    note,
    setFilteredNotes
  };

  return (
    <SelectedNoteContext.Provider value={value}>
      {children}
    </SelectedNoteContext.Provider>
  );
};