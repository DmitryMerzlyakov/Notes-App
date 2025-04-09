import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';

interface ListItemProps {
  note: { id: string; title: string };
  isSelected: boolean;
  onClick: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ note, isSelected, onClick }) => {
  return (
    <ListItemButton selected={isSelected} onClick={onClick}>
      <ListItemText primary={note.title} />
    </ListItemButton>
  );
};

export default ListItem;
