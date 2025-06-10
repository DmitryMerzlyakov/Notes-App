import React, { useState } from 'react';
import { Box } from '@mui/material';
import { SignIn, SignUp } from '@/components/widgets/forms';

export const LoginPage: React.FC = () => {

  const [isUser, setIdUser] = useState<boolean>(false);
  
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
