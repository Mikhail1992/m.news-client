import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '../../Button';
import Grid from '../../Grid';
import TextField from '../../TextField';
import classes from './index.module.css';

interface IFormInputs {
  email: string;
}

interface IProps {
  forgotPassword: (data: string) => void;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const ForgotPasswordForm = ({ forgotPassword }: IProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    forgotPassword(data.email);
  };

  const isButtonDisabled = Object.keys(errors).length > 0;
  return (
    <>
      <p className={classes.text}>
        Please, enter your email address. You will receive a link to create a new password via
        email.
      </p>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid type="container" marginBottom={8}>
          <Grid type="item" xs={12}>
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
          </Grid>
        </Grid>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={isButtonDisabled}
          role="button"
        >
          Send
        </Button>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
