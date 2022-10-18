import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import Button from '../../Button';
import TextField from '../../TextField';
import FieldContainer from '../../FieldContainer';
import classes from './index.module.css';

interface IFormInputs {
  password1: string;
  password2: string;
}

interface IProps {
  restorePassword: (password1: string, password2: string, token: string) => void;
}

const schema = yup
  .object({
    password1: yup.string().required().min(8),
    password2: yup
      .string()
      .required()
      .min(8)
      .oneOf([yup.ref('password1')], "passwords don't match"),
  })
  .required();

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const RestorePasswordForm = ({ restorePassword }: IProps) => {
  const query = useQuery();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      password1: '',
      password2: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    restorePassword(data.password1, data.password2, query.get('token') || '');
    reset();
  };

  const handleReset = () => reset();

  const isButtonDisabled = Object.keys(errors).length > 0;
  return (
    <form role="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <FieldContainer>
        <Controller
          name="password1"
          control={control}
          render={({ field }) => (
            <TextField
              type="password"
              label="New password*"
              error={!!errors.password1}
              helperText={errors.password1?.message || 'Password1 must be at least 8 chars long'}
              role="password1"
              FormHelperTextProps={{ role: 'alert' }}
              {...field}
            />
          )}
        />
      </FieldContainer>
      <FieldContainer>
        <Controller
          name="password2"
          control={control}
          render={({ field }) => (
            <TextField
              type="password"
              label="Confirm New Password"
              error={!!errors.password2}
              helperText={errors.password2?.message || 'Password2 should be equals Password1'}
              role="password2"
              FormHelperTextProps={{ role: 'alert' }}
              {...field}
            />
          )}
        />
      </FieldContainer>
      <div className={classes.buttons}>
        <Button variant="outlined" onClick={handleReset} role="button">
          CANCEL
        </Button>
        <Button variant="contained" type="submit" disabled={isButtonDisabled} role="button">
          RESTORE PASSWORD
        </Button>
      </div>
    </form>
  );
};

export default RestorePasswordForm;
