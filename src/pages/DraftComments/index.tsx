import { useFetchDraftComments } from '../../hooks/api/useFetchDraftCommets';
import CommentsList from '../../components/CommentsList';
import { PageWrapper } from '../../components/PageWrapper';

const DraftComments = () => {
  const { data: draftComments, isFetching, fetchNextPage, hasNextPage } = useFetchDraftComments();

  return (
    <PageWrapper isLoading={isFetching} title="Unpublished Comments" maxWidth="md">
      <CommentsList
        comments={draftComments}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        hasActionsPanel
        hasArticleInfo
      />
    </PageWrapper>
  );
};

export default DraftComments;
