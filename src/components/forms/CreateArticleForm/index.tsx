import { yupResolver } from '@hookform/resolvers/yup';
import MDEditor from '@uiw/react-md-editor';
import { useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ERRORS } from '../../../constants';
import { ICategory } from '../../../types/category';
import { ICreatedArticle, IFormInputs, IUploadImages } from '../../../types/form';
import { validFormat, validSize } from '../../../utilities';
import Button from '../../Button';
import FieldContainer from '../../FieldContainer';
import FormHelperText from '../../FormHelperText';
import TextField from '../../TextField';
import Select from '../../Select';
import classes from './index.module.css';

const schema = yup.object({
  title: yup.string().required(),
  url: yup.string().required(),
  spoiler: yup.string(),
  content: yup.string().required(),
  categoryId: yup.number().required(),
  picture: yup
    .mixed()
    .nullable()
    .test('format', ERRORS.FORMAT_ERROR, validFormat)
    .test('size', ERRORS.SIZE_ERROR, validSize),
  coverImage: yup
    .mixed()
    .nullable()
    .test('format', ERRORS.FORMAT_ERROR, validFormat)
    .test('size', ERRORS.SIZE_ERROR, validSize),
});

interface IProps {
  categories: ICategory[];
  uploadImage: (article: FormData) => Promise<IUploadImages>;
  createArticle: (article: ICreatedArticle) => Promise<void>;
}

const CreateArticleForm = ({ categories, uploadImage, createArticle }: IProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      title: '',
      url: '',
      spoiler: '',
      content: '',
      categoryId: categories[0].id,
      picture: '',
      coverImage: '',
    },
    resolver: yupResolver(schema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const formData = new FormData(formRef.current!);
    const images = await uploadImage(formData);

    await createArticle({ ...data, ...images });
    reset();
  };

  const handleReset = () => reset();

  const isButtonDisabled = Object.keys(errors).length > 0;

  return (
    <form
      className={classes.form}
      role="form"
      ref={formRef}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldContainer>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              label="Article Title*"
              error={!!errors.title?.message}
              helperText="Max 255 symbols"
              role="title"
              FormHelperTextProps={{ role: 'alert' }}
              id="title"
              placeholder="Add title here"
              multiline
              {...field}
            />
          )}
        />
      </FieldContainer>

      <div className={classes.fieldContainer}>
        <FieldContainer>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select
                label="Select Category*"
                options={categories.map((category) => ({
                  label: category.title,
                  value: category.id,
                }))}
                error={!!errors.categoryId?.message}
                helperText={errors.categoryId?.message}
                placeholder="Choose a category for this article"
                {...field}
              />
            )}
          />
        </FieldContainer>
      </div>

      <FieldContainer>
        <Controller
          name="url"
          control={control}
          render={({ field }) => (
            <TextField
              label="Article URL*"
              error={!!errors.url?.message}
              helperText={'Max 255 symbols'}
              role="url"
              FormHelperTextProps={{ role: 'alert' }}
              id="url"
              placeholder="Add URL here"
              multiline
              {...field}
            />
          )}
        />
      </FieldContainer>

      <FieldContainer>
        <Controller
          name="spoiler"
          control={control}
          render={({ field }) => (
            <TextField
              style={{ minHeight: '158px' }}
              label="Article Brief Description*"
              error={!!errors.spoiler?.message}
              helperText="Max 1 000 symbols"
              role="spoiler"
              FormHelperTextProps={{ role: 'alert' }}
              id="spoiler"
              placeholder="Add article brief description here"
              multiline
              {...field}
            />
          )}
        />
      </FieldContainer>

      <div className={classes.fieldContainer}>
        <FieldContainer>
          <Controller
            name="coverImage"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  type="file"
                  label="Cover Image"
                  error={!!errors.coverImage?.message}
                  helperText="Supported files: JPG, PDF, PNG"
                  id="coverImage"
                  placeholder="Upload file"
                  {...field}
                />
              );
            }}
          />
        </FieldContainer>
      </div>

      <div className={classes.fieldContainer}>
        <FieldContainer>
          <Controller
            name="picture"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  type="file"
                  label="Picture in Article"
                  error={!!errors.picture?.message}
                  helperText="Supported files: JPG, PDF, PNG"
                  id="picture"
                  placeholder="Upload file"
                  {...field}
                />
              );
            }}
          />
        </FieldContainer>
      </div>

      <FieldContainer>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <div data-color-mode="light" className={classes.area}>
              <p className={classes.label}>Article Text*</p>
              <MDEditor
                textareaProps={{
                  role: 'content',
                  title: 'content',
                  placeholder: 'Add article text here',
                }}
                {...field}
                preview="edit"
              />
              {errors.content && (
                <FormHelperText role="alert" error>
                  {errors.content?.message}
                </FormHelperText>
              )}
            </div>
          )}
        />
      </FieldContainer>

      <div className={classes.buttons}>
        <Button variant="outlined" type="button" onClick={handleReset}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" disabled={isButtonDisabled} role="button">
          Save Article
        </Button>
      </div>
    </form>
  );
};

export default CreateArticleForm;
