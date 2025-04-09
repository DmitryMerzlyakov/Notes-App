import React, { useState, useContext } from 'react';
import { TextField } from '@mui/material';
import { NotesContext } from '../../app/providers';

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { notes, setFilteredNotes } = useContext(NotesContext);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(term.toLowerCase()) ||
        note.content.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  return (
    <div>
      <TextField
        fullWidth
        placeholder="Поиск..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
