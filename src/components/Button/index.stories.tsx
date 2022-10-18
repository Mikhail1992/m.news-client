import Button from './index';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';

const stories = storiesOf('Buttons', module);
stories.add(
  'Sizes',
  (args: any) => {
    return (
      <Grid type="container" gap={1}>
        <Grid type="item" xs={12}>
          <Button {...args} size="small" />
        </Grid>
        <Grid type="item" xs={12}>
          <Button {...args} size="medium" />
        </Grid>
        <Grid type="item" xs={12}>
          <Button {...args} size="large" />
        </Grid>
      </Grid>
    );
  },
  {
    component: Button,
    args: {
      children: 'Size',
      size: 'large',
    },
    argTypes: {
      size: {
        type: 'string',
        description: 'Choose the size of your button',
        options: ['small', 'medium', 'large'],
        control: {
          type: 'radio',
        },
      },
    },
  },
);

stories.add(
  'Variant',
  (args: any) => {
    return (
      <Grid type="container" gap={1}>
        <Grid type="item" xs={12}>
          <Button {...args} size="medium" variant="contained" />
        </Grid>
        <Grid type="item" xs={12}>
          <Button {...args} size="medium" variant="secondary" />
        </Grid>
        <Grid type="item" xs={12}>
          <Button {...args} size="medium" variant="contained" disabled />
        </Grid>
        <Grid type="item" xs={12}>
          <Button {...args} size="medium" variant="outlined" />
        </Grid>
      </Grid>
    );
  },
  {
    component: Button,
    args: {
      children: 'Variant',
      variant: 'contained',
    },
    argTypes: {
      variant: {
        type: 'string',
        description: 'Choose the variant of your button',
        options: ['contained', 'outlined'],
        control: {
          type: 'radio',
        },
      },
    },
  },
);
