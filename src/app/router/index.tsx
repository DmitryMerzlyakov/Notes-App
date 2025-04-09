import { Route, Routes } from 'react-router-dom';
import { App } from '../App';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/" element={<App />}>
        {/* <Route index element={<HomePage />} /> */}
      </Route>
    </Routes>
  );
};

