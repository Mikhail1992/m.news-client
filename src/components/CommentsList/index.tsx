import { Fragment } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { useDeleteComment } from '../../hooks/api/useDeleteComment';
import { usePublishComment } from '../../hooks/api/usePublishComment';
import { IComment } from '../../types/comment';
import { FetchNextPage, IFetchingListData } from '../../types/common';
import ActionsPanel from '../ActionsPanel';
import CommentComponent from '../Comment';
import Divider from '../Divider';
import Grid from '../Grid';
import InfinityLoader from '../InfinityLoader';
import classes from './index.module.css';

interface IProps<T> {
  comments?: InfiniteData<IFetchingListData<T>>;
  fetchNextPage: FetchNextPage<T>;
  hasNextPage?: boolean;
  hasActionsPanel?: boolean;
  hasArticleInfo?: boolean;
}

function CommentsList({
  comments,
  fetchNextPage,
  hasNextPage = false,
  hasActionsPanel = false,
  hasArticleInfo = false,
}: IProps<IComment>) {
  const publishArticle = usePublishComment();
  const deleteComment = useDeleteComment();

  const handlePublishComment = (commentId: number) => {
    publishArticle.mutate(commentId);
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComment.mutate(commentId);
  };

  return (
    <div className={classes.root}>
      <InfinityLoader itemsPages={comments} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
        {({ items }) => {
          return items.map((comment) => (
            <Fragment key={comment.id}>
              <Grid type="item" xs={12} key={comment.id}>
                <CommentComponent comment={comment} hasArticleInfo={hasArticleInfo} />
                {hasActionsPanel && (
                  <Grid className={classes.comment} type="container" marginBottom={2}>
                    <ActionsPanel
                      entityType="comment"
                      handleDelete={() => handleDeleteComment(comment.id)}
                      handlePublish={() => handlePublishComment(comment.id)}
                    />
                  </Grid>
                )}
              </Grid>
              <Divider />
            </Fragment>
          ));
        }}
      </InfinityLoader>
    </div>
  );
}

export default CommentsList;
