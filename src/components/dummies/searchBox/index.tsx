import { useState } from 'react';
import { TextField } from '@mui/material';
import { useSelectedNote } from '@/hooks';

export const SearchBox = () => {

  const { setFilteredNotes } = useSelectedNote();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredNotes(term);
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
