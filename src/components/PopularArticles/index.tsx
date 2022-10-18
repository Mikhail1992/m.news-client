import Preview from '../Preview';

import { IArticle } from '../../types/article';
import Grid from '../Grid';

interface IProps {
  articles: IArticle[];
}

const PopularArticles = ({ articles }: IProps) => {
  return (
    <Grid type="container" marginBottom={2} gap={3}>
      {articles.map((article) => (
        <Grid type="item" key={article.id} xs={6} md={3}>
          <Preview article={article} type="thumbnail" />
        </Grid>
      ))}
    </Grid>
  );
};

export default PopularArticles;
