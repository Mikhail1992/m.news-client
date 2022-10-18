import { Fragment } from 'react';
import Divider from '../../components/Divider';
import Grid from '../../components/Grid';
import InfinityLoader from '../../components/InfinityLoader';
import { PageWrapper } from '../../components/PageWrapper';
import PopularArticles from '../../components/PopularArticles';
import Preview from '../../components/Preview';
import { useFetchData } from './useFetchData';

function Home() {
  const { popularArticles, articlesPages, isFetching, fetchNextPage, hasNextPage } = useFetchData();

  return (
    <PageWrapper isLoading={isFetching}>
      <PopularArticles articles={popularArticles} />
      <Divider />
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
}

export default Home;
