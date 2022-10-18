import { ComponentMeta, ComponentStory } from '@storybook/react';
import Divider from './index';

export default {
  title: 'Divider',
  component: Divider,
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = () => {
  return <Divider />;
};

export const Default = Template.bind({});
