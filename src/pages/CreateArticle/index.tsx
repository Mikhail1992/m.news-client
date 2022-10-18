import CreateArticleForm from '../../components/forms/CreateArticleForm';
import { PageWrapper } from '../../components/PageWrapper';
import { useCreateArticle } from '../../hooks/api/useCreateArticle';
import { useFetchCategories } from '../../hooks/api/useFetchCategories';
import { useUploadImage } from '../../hooks/api/useUploadImage';

const CreateArticle = () => {
  const { data: categories, isFetching } = useFetchCategories();
  const { mutateAsync: uploadImage } = useUploadImage();
  const { mutateAsync: createArticle } = useCreateArticle();

  return (
    <PageWrapper isLoading={isFetching} maxWidth="md" title="Create new article">
      <CreateArticleForm
        categories={categories}
        uploadImage={uploadImage}
        createArticle={createArticle}
      />
    </PageWrapper>
  );
};

export default CreateArticle;
