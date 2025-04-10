import { Box, Button, List, ListItemButton, ListItemText, Modal, Typography } from '@mui/material';
import { useNotes } from '../../../hooks';
import { SearchBox } from '../SearchBox';

import styles from './style.module.css';
import { useState } from 'react';
import { useGetNotesQuery } from '../../../store/notesApi';

export const Sidebar = () => {
  
  const { data: notes = [], isLoading } = useGetNotesQuery({userId: localStorage.getItem('userId') || ''});

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className={styles.wrapper}>
      <SearchBox />
      <List>
        {notes.map((note) => (
          <ListItemButton
            key={note.id}
            selected={note.id === selectedNoteId}
            onClick={() => setSelectedNoteId(note.id as string)}
          >
            <ListItemText primary={note.title} />
            <Button onClick={() => setNoteToDelete(note.id as string)}>Удалить</Button>
          </ListItemButton>
        ))}
      </List>

      <Modal open={!!noteToDelete} onClose={() => setNoteToDelete(null)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Подтвердите удаление
          </Typography>
          <Typography>
            Вы уверены, что хотите удалить эту заметку? Это действие нельзя отменить.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={() => setNoteToDelete(null)}>
              Отмена
            </Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>
              Удалить
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
