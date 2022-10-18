import InputLabel from './index';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';

const stories = storiesOf('InputLabels', module);
stories.add(
  'InputLabel',
  (args: any) => {
    return (
      <Grid type="container" gap={1}>
        <Grid type="item" xs={12}>
          <InputLabel {...args} />
        </Grid>
      </Grid>
    );
  },
  {
    component: InputLabel,
    args: {
      children: 'Label',
    },
  },
);
