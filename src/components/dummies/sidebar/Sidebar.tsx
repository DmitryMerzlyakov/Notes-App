import { List, ListItemButton, ListItemText } from '@mui/material';
import { useNotes } from '../../../hooks';
import { SearchBox } from '../SearchBox';

import styles from './style.module.css';

export const Sidebar = () => {
  const { notes, selectedNoteId, setSelectedNoteId, deleteNote } = useNotes();

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
            <button onClick={() => deleteNote(note.id as string)}>Удалить</button>
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};
