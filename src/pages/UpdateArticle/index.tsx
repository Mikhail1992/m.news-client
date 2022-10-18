import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../components/PageWrapper';
import UpdateArticleForm from '../../components/forms/UpdateArticleForm';
import { useUpdateArticle } from '../../hooks/api/useUpdateArticle';
import { useUploadImage } from '../../hooks/api/useUploadImage';
import { useFetchData } from './useFetchData';

const UpdateArticle = () => {
  const { articleUrl } = useParams();

  const { categories, article, isFetching } = useFetchData(articleUrl);
  const { mutateAsync: uploadImage } = useUploadImage();
  const { mutateAsync: updateArticle } = useUpdateArticle();

  return (
    <PageWrapper isLoading={isFetching} maxWidth="md" title="Update article">
      {article && (
        <UpdateArticleForm
          uploadImage={uploadImage}
          updateArticle={updateArticle}
          categories={categories}
          article={article}
        />
      )}
    </PageWrapper>
  );
};

export default UpdateArticle;
