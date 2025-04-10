import { useState } from 'react';
import { TextField } from '@mui/material';
import { useNotes } from '../../hooks';

export const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { notes, setFilteredNotes } = useNotes();

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
