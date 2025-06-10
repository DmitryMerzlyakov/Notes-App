import { useForm } from 'react-hook-form';
import { Button, TextField, Box, Typography } from '@mui/material';
import { ISignUpData } from '@/models';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../../firebase';

interface ISignUpProps {
  isUser: (value: boolean) => void;
}

export const SignUp = ({ isUser }: ISignUpProps) => {
  const [error, setError] = useState<string>('')
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ISignUpData>();

  const password = watch('password');

  const onSubmit = async (data: ISignUpData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      isUser(false)
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'passwords-mismatch':
            setError('Пароли не совпадают!')
            break
          case 'auth/too-many-requests':
            setError('Слишком много запросов!')
            break
          case 'auth/invalid-email':
            setError('Некорректный e-mail!')
            break
          case "auth/weak-password":
            setError('Cлишком легкий пароль!')
            break
          case 'auth/missing-password':
            setError('Введите пароль!')
            break
          default:
            break
        }
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 10 }}>
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
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Пароль должен содержать минимум 6 символов' },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Пароли не совпадают',
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ marginBottom: 1 }}>
          Зарегистрироваться
        </Button>
        <Button variant="contained" fullWidth onClick={() => isUser(false)}>
          У меня есть аккаунт
        </Button>
      </form>
    </Box>
  );
};
