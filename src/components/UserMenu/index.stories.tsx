import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import UserMenu from './MenuButton/index';

export default {
  title: 'UserMenu',
  component: UserMenu,
} as ComponentMeta<typeof UserMenu>;

const Template: ComponentStory<typeof UserMenu> = (arg) => {
  return (
    <BrowserRouter>
      <UserMenu {...arg} />
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
