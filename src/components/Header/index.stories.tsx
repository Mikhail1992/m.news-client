import { BrowserRouter } from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header from './index';

export default {
  title: 'Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

export const Thumbnail = Template.bind({});
