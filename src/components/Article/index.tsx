import cn from 'classnames';
import Markdown from 'markdown-to-jsx';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { IArticle } from '../../types/article';
import {
  isDeletingEnabled,
  isEditingEnabled,
  isPublishingEnabled,
  isResourceOwner,
  isUnpublishingEnabled,
} from '../../utilities';
import ActionsPanel from '../ActionsPanel';
import ArticleStatus from './ArticleStatus';
import classes from './index.module.css';

interface IProps {
  article: IArticle;
  handlePublishArticle: (id: IArticle['id']) => void;
  handleUnpublishArticle: (id: IArticle['id']) => void;
  handleDeleteArticle: (id: IArticle['id']) => void;
  handleEditArticle: (url: IArticle['url']) => void;
}

function ArticleComponent({
  article,
  handlePublishArticle,
  handleUnpublishArticle,
  handleDeleteArticle,
  handleEditArticle,
}: IProps) {
  const { user } = useAuth();
  const { title, content, coverImage } = article;
  const hasActionsPanel = isResourceOwner(user, article.userId === user?.id);

  return (
    <>
      {hasActionsPanel && (
        <div className={classes.devPanel}>
          <ArticleStatus published={!!article.published}>
            {article.published ? 'Published' : 'Unpublished'}
          </ArticleStatus>
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
                ? () => handleEditArticle(article.url)
                : undefined
            }
          />
        </div>
      )}

      <div
        className={cn(classes.coverImageWrapper, {
          [classes.noThumbnail]: !coverImage,
        })}
      >
        {coverImage && <img className={classes.coverImage} src={coverImage} alt={title} />}
        <h1 className={classes.title}>{title}</h1>
      </div>
      <main className={classes.content}>
        <Markdown>{content}</Markdown>
      </main>
      <Outlet />
    </>
  );
}

export default ArticleComponent;
