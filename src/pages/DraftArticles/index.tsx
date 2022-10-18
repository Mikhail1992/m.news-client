import { Fragment } from 'react';
import Divider from '../../components/Divider';
import Grid from '../../components/Grid';
import InfinityLoader from '../../components/InfinityLoader';
import { PageWrapper } from '../../components/PageWrapper';
import Preview from '../../components/Preview';
import { useFetchDraftArticles } from '../../hooks/api/useFetchDraftArticles';

const DraftArticles = () => {
  const { data: draftArticles, isFetching, fetchNextPage, hasNextPage } = useFetchDraftArticles();

  return (
    <PageWrapper isLoading={isFetching} title="Unpublished Articles">
      <InfinityLoader
        itemsPages={draftArticles}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      >
        {({ items }) => {
          return items.map((article) => (
            <Fragment key={article.id}>
              <Grid type="item" xs={12} key={article.id}>
                <Preview article={article} type="full" showActionsPanel />
              </Grid>
              <Divider />
            </Fragment>
          ));
        }}
      </InfinityLoader>
    </PageWrapper>
  );
};

export default DraftArticles;
