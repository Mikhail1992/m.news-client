import Loader from './index';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';

const stories = storiesOf('Loader', module);
stories.add('Loader', () => {
  return (
    <Grid type="item" xs={12}>
      <Loader />
    </Grid>
  );
});
