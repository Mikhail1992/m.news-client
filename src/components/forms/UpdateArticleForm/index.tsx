import { yupResolver } from '@hookform/resolvers/yup';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useMemo, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ERRORS } from '../../../constants';
import { IArticle } from '../../../types/article';
import { ICategory } from '../../../types/category';
import { IFormInputs, IUpdatedArticle, IUploadImages } from '../../../types/form';
import { validFormat, validSize } from '../../../utilities';
import Button from '../../Button';
import FormHelperText from '../../FormHelperText';
import TextField from '../../TextField';
import Select from '../../Select';
import classes from './index.module.css';
import cn from 'classnames';

const ArticleDto = (article: IArticle): Partial<IArticle> => {
  return {
    title: article?.title || '',
    url: article?.url || '',
    spoiler: article?.spoiler || '',
    content: article?.content || '',
    categoryId: article?.categoryId || 0,
    picture: article?.picture || '',
    coverImage: article?.picture || '',
  };
};

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
  article: IArticle;
  uploadImage: (article: FormData) => Promise<IUploadImages>;
  updateArticle: (article: IUpdatedArticle) => Promise<IArticle>;
}

const UpdateArticleForm = ({ categories, article, updateArticle, uploadImage }: IProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: useMemo(() => ArticleDto(article), [article]),
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    reset(ArticleDto(article));
  }, [article]);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const formData = new FormData(formRef.current!);
    const images = await uploadImage(formData);

    await updateArticle({ ...data, ...images, id: article.id });
    navigate('/');
  };

  const isButtonDisabled = Object.keys(errors).length > 0 || !article;
  const handleReset = () => reset();

  return (
    <form
      className={classes.form}
      role="form"
      ref={formRef}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!article && <FormHelperText error>Article are not ready to be updated</FormHelperText>}
      <div className={classes.field}>
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
      </div>

      <div className={cn(classes.field, classes.fieldContainer)}>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => {
            return (
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
            );
          }}
        />
      </div>

      <div className={classes.field}>
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
      </div>
      <div className={classes.field}>
        <Controller
          name="spoiler"
          control={control}
          render={({ field }) => (
            <TextField
              style={{ minHeight: '158px' }}
              label="SpArticle Brief Description*oiler"
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
      </div>

      <div className={cn(classes.field, classes.fieldContainer)}>
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
      </div>

      <div className={cn(classes.field, classes.fieldContainer)}>
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
      </div>

      <div className={classes.field}>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <div data-color-mode="light" className={classes.area}>
              <p className={classes.label}>Article Text*</p>
              <MDEditor
                textareaProps={{
                  role: 'textbox',
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
      </div>

      <div className={classes.buttons}>
        <Button variant="outlined" type="button" onClick={handleReset}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" disabled={isButtonDisabled} role="button">
          Update Article
        </Button>
      </div>
    </form>
  );
};

export default UpdateArticleForm;
