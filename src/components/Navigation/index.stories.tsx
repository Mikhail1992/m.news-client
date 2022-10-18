import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { PAGES } from '../../constants';
import Navigation from './index';

export default {
  title: 'Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = () => {
  return (
    <BrowserRouter>
      <Navigation navItems={PAGES} />
    </BrowserRouter>
  );
};

export const Thumbnail = Template.bind({});
