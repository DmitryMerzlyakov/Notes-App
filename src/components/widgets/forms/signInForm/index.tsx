import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { auth, signInWithEmailAndPassword } from '../../../../../firebase';
import { FirebaseError } from 'firebase/app';
import { ISignInData } from '../../../../models';
import { useState } from 'react';

interface ISignInProps {
  isUser: (value: boolean) => void;
}

export const SignIn = ({ isUser }: ISignInProps) => {
  const [error, setError] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm<ISignInData>();
  const navigate = useNavigate();

  const onSubmit = async (data: ISignInData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      if (user) {
        sessionStorage.setItem('userId', user.uid);
        navigate('/');
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            setError('Такого пользователя не существует!')
            break
          case 'auth/wrong-password':
            setError('Неверный пароль!')
            break
          default:
            break
        }
      } else {
        alert('Произошла неизвестная ошибка');
      }
    }
  };

  return (
    <>
      {error && <Typography>{error}</Typography>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ marginBottom: 1 }}>
          Войти
        </Button>
        <></>
        <Button variant="contained" fullWidth onClick={() => isUser(true)}>
          Зарегистрироваться
        </Button>
      </form>
    </>
  );
};
