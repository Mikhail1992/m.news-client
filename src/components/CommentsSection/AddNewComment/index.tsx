import MDEditor from '@uiw/react-md-editor';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useCreateComment } from '../../../hooks/api/useCreateComment';
import Button from '../../Button';
import Grid from '../../Grid';

interface IFormInputs {
  comment: string;
}

interface IProps {
  articleId: number;
}

function AddNewComment({ articleId }: IProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<{ comment: string }>({
    defaultValues: {
      comment: '',
    },
  });

  const { mutateAsync } = useCreateComment();

  const onSubmit: SubmitHandler<IFormInputs> = ({ comment }) => {
    mutateAsync({ articleId, text: comment });
    reset();
  };

  return (
    <>
      <p>
        <b>Leave a comment</b>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <div data-color-mode="light">
              <MDEditor
                textareaProps={{
                  role: 'textbox',
                  title: 'comment',
                }}
                {...field}
                preview="edit"
              />
            </div>
          )}
        />
        <Grid type="container" justifyContent="flex-end" marginTop={2}>
          <Grid type="item">
            <Button role="button" type="submit" disabled={!isDirty} variant="contained">
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default AddNewComment;
