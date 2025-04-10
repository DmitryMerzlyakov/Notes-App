import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { auth, signInWithEmailAndPassword } from '../../../../../firebase';
import { FirebaseError } from 'firebase/app';
import { ISignInData } from '../../../../models';

interface ISignInProps {
  isUser: (value: boolean) => void;
}

export const SignIn = ({isUser}: ISignInProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ISignInData>();
  const navigate = useNavigate();

  const onSubmit = async (data: ISignInData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      if (user) {
        localStorage.setItem('userId', user.uid);
        navigate('/'); 
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error('Firebase Error:', error.code, error.message);
        alert(`Ошибка входа: ${error.message}`);
      } else {
        console.error('Неизвестная ошибка:', error);
        alert('Произошла неизвестная ошибка');
      }
    }
  };

  return (
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
      <Button type="submit" variant="contained" fullWidth sx={{marginBottom: 1}}>
        Войти
      </Button>
      <></>
      <Button variant="contained" fullWidth onClick={() => isUser(true)}>
        Зарегистрироваться
      </Button>
    </form>
  );
};
