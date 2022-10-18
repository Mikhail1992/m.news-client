import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import ActionsPanel from './index';

export default {
  title: 'ActionsPanel',
  component: ActionsPanel,
} as ComponentMeta<typeof ActionsPanel>;

const Template: ComponentStory<typeof ActionsPanel> = (arg) => {
  return (
    <BrowserRouter>
      <ActionsPanel {...arg} />
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
Default.args = {
  handlePublish: () => {},
  handleEdit: () => {},
  handleDelete: () => {},
};
