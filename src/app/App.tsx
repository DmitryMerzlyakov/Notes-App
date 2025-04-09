import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { NotesProvider } from './providers';

export const App = () => {
  return (
    <BrowserRouter>
      <NotesProvider>
        <AppRoutes />
      </NotesProvider>
    </BrowserRouter>
  );
};
