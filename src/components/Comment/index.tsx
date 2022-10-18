import Markdown from 'markdown-to-jsx';
import { format } from 'date-fns';
import { IComment } from '../../types/comment';
import classes from './index.module.css';
import { useLocation, Link } from 'react-router-dom';
import { useFetchArticles } from '../../hooks/api/useFetchArticles';

interface IProps {
  comment: IComment;
  hasArticleInfo?: boolean;
}

function CommentComponent({ comment, hasArticleInfo = false }: IProps) {
  const {
    user: { name },
    text,
    createdAt,
    articleId,
  } = comment;

  const { data: articlesPages } = useFetchArticles();
  const articleCategory = articlesPages?.pages[0].data.filter((item) => item.id === articleId)[0]
    ?.category?.title;

  const date = new Date(Date.parse(createdAt));
  const formattedDate = format(date, 'dd.MM.yyyy');
  const draftComment = useLocation().pathname.includes('draft-comments');

  return (
    <div className={classes.root}>
      {draftComment && articleCategory && hasArticleInfo && (
        <div className={classes.articleLink}>
          <span>Comment for </span>
          <Link to={`/category/${articleCategory || ''}`} className={classes.categoryTitle}>
            {comment?.article?.title}
          </Link>
        </div>
      )}
      <div className={classes.head}>
        <div className={classes.name}>{name}</div>
        <div className={classes.date}>{formattedDate}</div>
      </div>
      <div className={classes.content}>
        <Markdown>{text}</Markdown>
      </div>
    </div>
  );
}

export default CommentComponent;
