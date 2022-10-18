import { useNavigate, useParams } from 'react-router-dom';
import Article from '../../components/Article';
import CommentsSection from '../../components/CommentsSection';
import { PageWrapper } from '../../components/PageWrapper';
import { useDeleteArticle } from '../../hooks/api/useDeleteArticle';
import { useFetchArticleByUrl } from '../../hooks/api/useFetchArticleByUrl';
import { useFetchArticleComments } from '../../hooks/api/useFetchArticleComments';
import { usePublishArticle } from '../../hooks/api/usePublishArticle';
import useAuth from '../../hooks/useAuth';
import { IArticle } from '../../types/article';

function ViewArticle() {
  const { user } = useAuth();
  const { articleUrl } = useParams();
  const { data: article, isFetching } = useFetchArticleByUrl(articleUrl);
  const { data: comments, fetchNextPage, hasNextPage } = useFetchArticleComments(article?.id);

  const navigate = useNavigate();
  const publishArticle = usePublishArticle();
  const deleteArticle = useDeleteArticle();

  const handlePublishArticle = (articleId: IArticle['id']) => {
    publishArticle.mutate({ articleId, published: true });
  };

  const handleUnpublishArticle = (articleId: IArticle['id']) => {
    publishArticle.mutate({ articleId, published: false });
  };

  const handleDeleteArticle = (articleId: IArticle['id']) => {
    deleteArticle.mutate(articleId, {
      onSuccess: () => navigate(`/`),
    });
  };

  const handleEditArticle = (articleUrl: IArticle['url']) => {
    navigate(`/update-article/${articleUrl}`);
  };

  return (
    <PageWrapper isLoading={isFetching}>
      {!!article && (
        <>
          <Article
            article={article}
            handlePublishArticle={handlePublishArticle}
            handleUnpublishArticle={handleUnpublishArticle}
            handleDeleteArticle={handleDeleteArticle}
            handleEditArticle={handleEditArticle}
          />
          <CommentsSection
            isLoggedIn={!!user}
            comments={comments}
            articleId={article.id}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </>
      )}
    </PageWrapper>
  );
}

export default ViewArticle;
