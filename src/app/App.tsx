import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { ThemeProvider } from './providers';

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
};
