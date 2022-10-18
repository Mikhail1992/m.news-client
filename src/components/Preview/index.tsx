import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import CountBadge from './CountBadge';
import classes from './index.module.css';
import { IArticle } from '../../types/article';
import ActionsPanel from '../ActionsPanel';
import useAuth from '../../hooks/useAuth';
import { usePublishArticle } from '../../hooks/api/usePublishArticle';
import { useDeleteArticle } from '../../hooks/api/useDeleteArticle';
import { useMemo } from 'react';
import {
  isDeletingEnabled,
  isEditingEnabled,
  isPublishingEnabled,
  isResourceOwner,
  isUnpublishingEnabled,
} from '../../utilities';

export const FULL_PREVIEW_TYPE = 'full';
export const THUMBNAIL_PREVIEW_TYPE = 'thumbnail';

interface IProps {
  article: IArticle;
  type?: 'full' | 'thumbnail';
  showActionsPanel?: boolean;
}

function Preview({ article, type = FULL_PREVIEW_TYPE, showActionsPanel = false }: IProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const publishArticle = usePublishArticle();
  const deleteArticle = useDeleteArticle();

  const handlePublishArticle = (articleId: number) => {
    publishArticle.mutate({ articleId, published: true });
  };

  const handleUnpublishArticle = (articleId: number) => {
    publishArticle.mutate({ articleId, published: false });
  };

  const handleDeleteArticle = (articleId: number) => {
    deleteArticle.mutate(articleId);
  };

  const hasActionsPanel = isResourceOwner(user, article.userId === user?.id);
  const renderActionsPanel = hasActionsPanel && showActionsPanel;
  const categoryTitle = useMemo(() => {
    return `${article.category?.title.charAt(0).toUpperCase()}${article.category?.title
      .split('')
      .splice(1)
      .join('')}`;
  }, [article.category?.title]);

  return (
    <div className={classes.root}>
      <article data-testid="article-preview" className={cn({ [classes[type]]: !!type })}>
        <div
          className={cn(classes.pictureWrapper, {
            [classes.noThumbnail]: !article.picture,
            [classes.pictureWrapperFull]: type === FULL_PREVIEW_TYPE,
          })}
        >
          {article.picture && (
            <img className={classes.picture} src={article.picture} alt={article.title} />
          )}
        </div>
        <div
          className={cn(classes.textBlock, {
            [classes.textBlockWithActionsPanel]: renderActionsPanel,
          })}
        >
          <div className={classes.textBlockTitle}>
            <Link
              to={`/category/${article?.category?.title || ''}`}
              className={classes.categoryTitle}
            >
              {categoryTitle}
            </Link>

            <div className={classes.badges}>
              <div className={classes.badge}>
                <CountBadge icon="messages" count={article._count?.comments} />
              </div>
              <div className={classes.badge}>
                <CountBadge icon="profile-2user" count={article.views} />
              </div>
            </div>
          </div>
          <Link
            to={`/category/${article?.category?.title}/${article.url}`}
            className={classes.title}
          >
            {article.title}
          </Link>
          <p className={classes.spoiler}>
            {article?.spoiler}{' '}
            <Link
              to={`/category/${article?.category?.title}/${article.url}`}
              className={classes.aditionalInfo}
            >
              [More...]
            </Link>
          </p>
        </div>
      </article>
      {renderActionsPanel && (
        <div className={classes.actionsPanel}>
          <ActionsPanel
            entityType="article"
            handleDelete={
              isDeletingEnabled(user, article.userId === user?.id, article.published)
                ? () => handleDeleteArticle(article.id)
                : undefined
            }
            handleUnpublish={
              isUnpublishingEnabled(user, article.published)
                ? () => handleUnpublishArticle(article.id)
                : undefined
            }
            handlePublish={
              isPublishingEnabled(user, article.published)
                ? () => handlePublishArticle(article.id)
                : undefined
            }
            handleEdit={
              isEditingEnabled(user, article.userId === user?.id)
                ? () => navigate(`/update-article/${article.url}`)
                : undefined
            }
          />
        </div>
      )}
    </div>
  );
}

export default Preview;
