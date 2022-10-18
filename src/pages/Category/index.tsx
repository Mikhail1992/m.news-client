import { Fragment } from 'react';
import { pathOr } from 'ramda';
import { useParams } from 'react-router-dom';
import Divider from '../../components/Divider';
import Grid from '../../components/Grid';

import InfinityLoader from '../../components/InfinityLoader';
import { PageWrapper } from '../../components/PageWrapper';
import Preview from '../../components/Preview';
import { useFetchArticlesByCategoryUrl } from '../../hooks/api/useFetchArticlesByCategoryUrl';

const Category = () => {
  const { categoryUrl } = useParams();

  const {
    isFetching,
    data: articlesPages,
    fetchNextPage,
    hasNextPage,
  } = useFetchArticlesByCategoryUrl(categoryUrl);

  const categoryName = pathOr('', ['pages', 0, 'data', 0, 'category', 'title'], articlesPages);

  return (
    <PageWrapper isLoading={isFetching} title={categoryName}>
      <InfinityLoader
        itemsPages={articlesPages}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      >
        {({ items }) => {
          return items.map((article) => (
            <Fragment key={article.id}>
              <Grid type="item" xs={12} key={article.id}>
                <Preview article={article} type="full" />
              </Grid>
              <Divider />
            </Fragment>
          ));
        }}
      </InfinityLoader>
    </PageWrapper>
  );
};

export default Category;
