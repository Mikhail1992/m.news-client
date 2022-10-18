import FormHelperText from './index';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';

const stories = storiesOf('FormHelperText', module);
stories.add('FormHelperText', (args: any) => {
  return (
    <Grid type="container" gap={1}>
      <Grid type="item" xs={12}>
        <FormHelperText {...args} />
      </Grid>
      <Grid type="item" xs={12}>
        <FormHelperText {...args} error />
      </Grid>
    </Grid>
  );
});
