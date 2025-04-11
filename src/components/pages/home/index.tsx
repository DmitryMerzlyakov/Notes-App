import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { NoteEditor, Sidebar, Workspace } from '../../dummies';

export const HomePage = () => {
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
          <Workspace setIsEditing={setIsEditing}/>
            :
          <NoteEditor onClose={setIsEditing} />
        }
      </Box>
    </Box>
  );
};
