import TextField from './index';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';

const stories = storiesOf('TextFields', module);
stories.add('TextFields', (args: any) => {
  return (
    <Grid type="container" gap={1}>
      <Grid type="item" xs={12}>
        <TextField {...args} id="1" placeholder="Default" label="Default" />
      </Grid>
      <Grid type="item" xs={12}>
        <TextField {...args} id="2" disabled label="Disabled" />
      </Grid>
      <Grid type="item" xs={12}>
        <TextField {...args} id="4" helperText="Default text" label="With HelperText" />
      </Grid>
      <Grid type="item" xs={12}>
        <TextField {...args} id="3" error helperText="Default text" label="Error" />
      </Grid>
      <Grid type="item" xs={12}>
        <TextField {...args} id="5" type="file" label="File" placeholder="Attach some file here" />
      </Grid>
      <Grid type="item" xs={12}>
        <TextField {...args} id="5" multiline label="Multiline" placeholder="Multiline input" />
      </Grid>
    </Grid>
  );
});
