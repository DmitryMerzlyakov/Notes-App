import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useNotes } from '../../hooks';

interface INoteEditorProps {
  onClose: () => void;
}

export const NoteEditor = ({ onClose }: INoteEditorProps) => {
  const { selectedNote, updateNote, addNote } = useNotes();
  const [title, setTitle] = useState(selectedNote?.title || '');
  const [content, setContent] = useState(selectedNote?.content || '');

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Заполните заголовок и содержимое заметки');
      return;
    }
    if (selectedNote) {
      await updateNote(selectedNote.id!, content);
    } else {
      const newNote = {
        id: crypto.randomUUID(),
        title,
        content,
        userId: localStorage.getItem('userId') || '',
      };
      await addNote(newNote);
    }
    onClose();
  };

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Отмена
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};
