import { ListItemButton, ListItemText } from '@mui/material';

interface IListItemProps {
  note: { id: string; title: string };
  isSelected: boolean;
  onClick: () => void;
}

export const ListItem = ({ note, isSelected, onClick }: IListItemProps) => {
  return (
    <ListItemButton selected={isSelected} onClick={onClick}>
      <ListItemText primary={note.title} />
    </ListItemButton>
  );
};
