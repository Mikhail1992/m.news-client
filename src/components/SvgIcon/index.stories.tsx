import SvgIcon from './index';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';

const stories = storiesOf('SvgIcon', module);
stories.add('Icons', (args: any) => {
  return (
    <Grid type="container" gap={1}>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="messages" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="profile-2user" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="user" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="arrow-down" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="arrow-up" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="arrow-left" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="logout" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="trash" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="edit" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="publish" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="unpublish" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="cancel" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="error" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="info" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="mobile-menu" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="info" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="eye-slash" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="eye" />
      </Grid>
    </Grid>
  );
});

stories.add('Sizes', (args: any) => {
  return (
    <Grid type="container" gap={1}>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="messages" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} size={30} icon="messages" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} size={40} icon="messages" />
      </Grid>
    </Grid>
  );
});

stories.add('Colors', (args: any) => {
  return (
    <Grid type="container" gap={1}>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} icon="messages" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} color="red" icon="messages" />
      </Grid>
      <Grid type="item" xs={1}>
        <SvgIcon {...args} color="green" icon="messages" />
      </Grid>
    </Grid>
  );
});
