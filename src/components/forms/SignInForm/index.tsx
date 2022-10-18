import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import Button from '../../Button';
import FieldContainer from '../../FieldContainer';
import TextField from '../../TextField';
import classes from './index.module.css';

export interface IFormInputs {
  email: string;
  password: string;
}

interface IProps {
  login: (data: IFormInputs) => void;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  })
  .required();

const SignInForm = ({ login }: IProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    login(data);
  };

  const isButtonDisabled = Object.keys(errors).length > 0;
  return (
    <form role="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <FieldContainer>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              role="email"
              FormHelperTextProps={{ role: 'alert' }}
              placeholder="Add email here"
              {...field}
            />
          )}
        />
      </FieldContainer>
      <FieldContainer>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              type="password"
              label="Password"
              error={!!errors.password}
              helperText={errors.password?.message || 'Password must be at least 8 chars long'}
              role="password"
              FormHelperTextProps={{ role: 'alert' }}
              placeholder="Add password here"
              {...field}
            />
          )}
        />
      </FieldContainer>

      <Link to="/forgot-password" className={classes.link}>
        Forgot Password ?
      </Link>

      <Button variant="contained" type="submit" fullWidth disabled={isButtonDisabled} role="button">
        Login
      </Button>
    </form>
  );
};

export default SignInForm;
