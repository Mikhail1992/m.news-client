import { IComment } from '../../types/comment';
import AddNewComment from './AddNewComment';
import AddNewCommentFallBack from './AddNewCommentFallBack';
import CommentsList from '../CommentsList';
import { FetchNextPage, IFetchingListData } from '../../types/common';
import { InfiniteData } from '@tanstack/react-query';

interface IProps {
  articleId: number;
  comments?: InfiniteData<IFetchingListData<IComment>>;
  isLoggedIn: boolean;
  fetchNextPage: FetchNextPage<IComment>;
  hasNextPage?: boolean;
}

function CommentsSection({ articleId, comments, isLoggedIn, fetchNextPage, hasNextPage }: IProps) {
  return (
    <>
      {isLoggedIn ? <AddNewComment articleId={articleId} /> : <AddNewCommentFallBack />}
      <CommentsList comments={comments} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
    </>
  );
}

export default CommentsSection;
