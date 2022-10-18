import { ComponentMeta, ComponentStory } from '@storybook/react';
import CustomContainer from './index';

export default {
  title: 'Container',
  component: CustomContainer,
} as ComponentMeta<typeof CustomContainer>;

const child = (
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
    Some text
  </div>
);

const Template: ComponentStory<typeof CustomContainer> = (arg) => {
  return <CustomContainer {...arg} />;
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  children: child,
  maxWidth: 'xs',
};

export const Small = Template.bind({});
Small.args = {
  children: child,
  maxWidth: 'sm',
};

export const Medium = Template.bind({});
Medium.args = {
  children: child,
  maxWidth: 'md',
};

export const Large = Template.bind({});
Large.args = {
  children: child,
  maxWidth: 'lg',
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  children: child,
  maxWidth: 'xl',
};
