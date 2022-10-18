import { ComponentMeta, ComponentStory } from '@storybook/react';
import Grid from './index';

export default {
  title: 'Grid',
  component: Grid,
} as ComponentMeta<typeof Grid>;

const Child = () => (
  <div
    style={{
      width: '100%',
      height: '50px',
      backgroundColor: 'rgb(195,232,243)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    Col
  </div>
);

const Template: ComponentStory<typeof Grid> = (arg) => {
  return <Grid {...arg} />;
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  children: (
    <>
      <Grid type="item" xs={2} sm={4} md={6} lg={12}>
        <Child />
      </Grid>
      <Grid type="item" xs={2} sm={4} md={6} lg={12}>
        <Child />
      </Grid>
      <Grid type="item" xs={2} sm={4} md={6} lg={12}>
        <Child />
      </Grid>
      <Grid type="item" xs={2} sm={4} md={6} lg={12}>
        <Child />
      </Grid>
      <Grid type="item" xs={2} sm={4} md={6} lg={12}>
        <Child />
      </Grid>
      <Grid type="item" xs={2} sm={4} md={6} lg={12}>
        <Child />
      </Grid>
    </>
  ),
  type: 'container',
  gap: 2,
};
