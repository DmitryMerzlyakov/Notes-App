import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { auth } from '@/firebase';

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    sessionStorage.removeItem('userId');
    navigate('/login');
  };

  return <Button variant="contained" onClick={handleLogout}>Выйти</Button>;
};
