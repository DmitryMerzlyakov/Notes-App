import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNotes } from '../../../hooks';
import { SearchBox, Sidebar, NoteEditor } from '../../dummies';

export const HomePage = () => {
  const { setSelectedNoteId, fetchUserNotes } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  

  useEffect(() => {
    fetchUserNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreateNote = () => {
    setSelectedNoteId(null); 
    setIsEditing(true);
  };

  const handleCloseEditor = () => {
    setIsEditing(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">Мои заметки</Typography>
          <Button variant="contained" onClick={handleCreateNote}>
            Создать заметку
          </Button>
        </Box>
        <SearchBox />
        {isEditing && <NoteEditor onClose={handleCloseEditor} />}
      </Box>
    </Box>
  );
};
