import { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useAddNoteMutation, useUpdateNoteMutation } from '@/store/notesApi';
import { useSelectedNote } from '@/hooks';

interface INoteEditorProps {
  onClose: (value: boolean) => void;
}

export const NoteEditor = ({ onClose }: INoteEditorProps) => {

  const { note } = useSelectedNote();
  const [addNote] = useAddNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [isError, serIsError] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(note?.title || '');
  const [content, setContent] = useState<string>(note?.content || '');

  const handleCreateNote = async () => {
    if (!title.trim() || !content.trim()) { serIsError(true) }
    else {
      const newNote = {
        title,
        content,
        userId: sessionStorage.getItem('userId') || '',
      }
      await addNote(newNote).finally(() => onClose(false))
    }
  };

  const handleUpdateNote = async () => {
    await updateNote({
      id: note?.id as string,
      title,
      content,
    }).finally(() => onClose(false))
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <TextField
        label="Заголовок"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <SimpleMDE
        value={content}
        onChange={(value) => setContent(value)}
      />
      {isError && <Typography variant="body1" color="error">Заполните поля</Typography>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" onClick={() => onClose(false)}>
          Отмена
        </Button>
        <Button variant="contained" onClick={note ? handleUpdateNote : handleCreateNote}>
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};
