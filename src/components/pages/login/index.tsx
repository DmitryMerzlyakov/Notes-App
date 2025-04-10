import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { SignIn, SignUp } from '../../widgets/forms';

export const LoginPage: React.FC = () => {

  const userId = localStorage.getItem('userId') || '';
  const [isUser, setIdUser] = useState<boolean>(false);

  useEffect(() => {}, [userId])
  
  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 10 }}>
      {
        isUser ?
        <SignUp isUser={setIdUser}/>
        :
        <SignIn isUser={setIdUser}/>
      }
    </Box>
  );
};
