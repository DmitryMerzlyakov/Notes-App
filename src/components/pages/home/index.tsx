import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelectedNote } from '@/hooks';
import { NoteCard, NoteEditor, Sidebar } from '@/components/dummies';

export const HomePage = () => {
  const { selectedNoteId } = useSelectedNote();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">Мои заметки</Typography>
          <Button variant="contained" onClick={() => setIsEditing(true)}>
            Создать заметку
          </Button>
        </Box>
        {!isEditing ?
          <>
            {selectedNoteId && <NoteCard onEdit={setIsEditing} />}
          </>
          :
          <NoteEditor onClose={setIsEditing} />
        }
      </Box>
    </Box>
  );
};
