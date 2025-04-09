import React, { useContext } from 'react';
import { List } from '@mui/material';
import SearchBox from './SearchBox';
import ListItem from './ListItem';
import { NotesContext } from '../../app/providers';

const Sidebar: React.FC = () => {
  const { notes, selectedNoteId, setSelectedNoteId } = useContext(NotesContext);

  return (
    <div>
      <SearchBox />
      <List>
        {notes.map((note) => (
          <ListItem
            key={note.id}
            note={note}
            isSelected={note.id === selectedNoteId}
            onClick={() => setSelectedNoteId(note.id)}
          />
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
