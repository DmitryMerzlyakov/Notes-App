import { Box, Typography, Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useDeleteNoteMutation, useGetNoteByIdQuery } from '@/store/notesApi';
import { useSelectedNote } from '@/hooks';

interface INoteCardProps {
  onEdit: (value: boolean) => void;
}

export const NoteCard = ({ onEdit }: INoteCardProps) => {

  const [deleteNote] = useDeleteNoteMutation();
  const { selectedNoteId, setSelectedNoteId } = useSelectedNote();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {data: currentNote, isLoading} = useGetNoteByIdQuery(selectedNoteId || '');

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id).finally(() => (setIsVisible(false), setSelectedNoteId(null)));
  };

  return (
    <>
      {!isLoading && <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
          position: 'relative',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {currentNote?.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            flex: 1,
            maxWidth: '80%',
            wordWrap: 'break-word',
          }}
        >
          {currentNote?.content}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            position: 'absolute',
            top: '16px',
            right: '16px',
          }}
        >
          <Button variant="outlined" size="small" onClick={() => onEdit(true)}>
            Редактировать
          </Button>
          <Button variant="contained" color="error" size="small" onClick={() => setIsVisible(true)}>
            Удалить
          </Button>
        </Box>
      </Box>}
      <Modal open={isVisible} onClose={() => setIsVisible(false)}>
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
          <Typography>Вы уверены, что хотите удалить эту заметку? Это действие нельзя отменить.</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={() => setIsVisible(false)}>
              Отмена
            </Button>
            <Button variant="contained" color="error" onClick={() => handleDeleteNote(currentNote!.id as string)}>
              Удалить
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
