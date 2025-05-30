import {  Box, List, ListItemButton, ListItemText } from '@mui/material';
import { SearchBox } from '../searchBox';
import { useGetNotesQuery } from '../../../store/notesApi';
import { useSelectedNote } from '../../../hooks/useSelectNote';
import { ThemeToggle } from '../themeToggle';
import { LogoutButton } from '../logout';
import { useTheme as useMuiTheme } from '@mui/material/styles';

export const Sidebar = () => {
  
  const theme = useMuiTheme();
  const { filteredNotes } = useSelectedNote();
  const { selectedNoteId, setSelectedNoteId } = useSelectedNote();
  const { data: notes = [], isLoading } = useGetNotesQuery({userId: sessionStorage.getItem('userId') || ''});  

  console.log(notes);
  
  const handleFilteredNotes = () => {
    const filtered = notes.filter(
      (note) => note.title.toLowerCase().includes(filteredNotes.toLowerCase())
    );

    return filtered;
  }
  
  return (
    <Box sx={{display: 'flex', padding: '10px', flexDirection: 'column', minWidth: '15%'}}>
      <Box sx={{display: 'flex', gap: '10px', padding: '10px 0', justifyContent: 'space-between', bgcolor: theme.palette.background.default }}>
        <ThemeToggle />
        <LogoutButton />
      </Box>
      <SearchBox />
      {
        isLoading ?
        <ListItemText primary={'Загрузка'}/>
        :
        <List>
          {handleFilteredNotes().map((note) => (
            <ListItemButton
              key={note.id}
              selected={note.id === selectedNoteId}
              onClick={() => setSelectedNoteId(note.id as string)}
            >
              <ListItemText primary={note.title} />
            </ListItemButton>
          ))}
        </List>
      }
    </Box>
  );
};
