import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

import TextField from '../../TextField';
import Button from '../../Button';
import classes from './index.module.css';
import FieldContainer from '../../FieldContainer';

export interface IFormInputs {
  email: string;
  password: string;
}
interface IProps {
  register: (data: IFormInputs) => void;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  })
  .required();

const SignUpForm = ({ register }: IProps) => {
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

  const isButtonDisabled = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    register(data);
  };

  return (
    <form role="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.message}>
        Already have the account? <Link to="/sign-in">Login</Link>
      </div>
      <FieldContainer>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              autoComplete="off"
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
      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={isButtonDisabled}
          role="button"
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
