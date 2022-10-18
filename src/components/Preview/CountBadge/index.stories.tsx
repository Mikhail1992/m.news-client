import { ComponentStory, ComponentMeta } from '@storybook/react';
import CountBadge from '.';

export default {
  title: 'CountBadge',
  component: CountBadge,
} as ComponentMeta<typeof CountBadge>;

const Template: ComponentStory<typeof CountBadge> = (arg) => {
  return <CountBadge {...arg} />;
};

export const Default = Template.bind({});
Default.args = {
  count: 10,
  icon: 'messages',
};
