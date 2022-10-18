import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useCreateCategory } from '../../../hooks/api/useCreateCategory';
import { ICategory } from '../../../types/category';
import Button from '../../Button';
import FieldContainer from '../../FieldContainer';
import TextField from '../../TextField';
import classes from './index.module.css';

interface IFormInputs extends Pick<ICategory, 'title' | 'url'> {}

const schema = yup
  .object({
    title: yup.string().required(),
    url: yup.string().required(),
  })
  .required();

const CreateCategoryForm = () => {
  const { mutateAsync } = useCreateCategory();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      title: '',
      url: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    await mutateAsync(data);
    reset();
  };

  const handleReset = () => reset();

  const isButtonDisabled = Object.keys(errors).length > 0;
  return (
    <form role="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <FieldContainer>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              label="Category title*"
              error={!!errors.title}
              helperText={errors.title?.message || 'Title must start with capital letter'}
              role="title"
              FormHelperTextProps={{ role: 'alert' }}
              {...field}
            />
          )}
        />
      </FieldContainer>
      <FieldContainer>
        <Controller
          name="url"
          control={control}
          render={({ field }) => (
            <TextField
              label="Category URL"
              error={!!errors.url}
              helperText={errors.url?.message}
              role="url"
              FormHelperTextProps={{ role: 'alert' }}
              {...field}
            />
          )}
        />
      </FieldContainer>
      <div className={classes.buttons}>
        <Button variant="outlined" onClick={handleReset}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" disabled={isButtonDisabled} role="button">
          Save Category
        </Button>
      </div>
    </form>
  );
};

export default CreateCategoryForm;
