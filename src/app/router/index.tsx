import { Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage } from '../../components/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

