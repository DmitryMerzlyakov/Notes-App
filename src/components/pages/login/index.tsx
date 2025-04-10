import React from 'react';
import { Box } from '@mui/material';
import { SignIn, SignUp } from '../../widgets/forms';

export const LoginPage: React.FC = () => {

  const userId = localStorage.getItem('userId') || '';
  
  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 10 }}>
      {
        userId.length ?
        <SignUp/>
        :
        <SignIn/>
      }
    </Box>
  );
};
