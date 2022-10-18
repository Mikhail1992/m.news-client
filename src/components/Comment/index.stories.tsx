import { ComponentStory, ComponentMeta } from '@storybook/react';
import Comment from './';

export default {
  title: 'Comment',
  component: Comment,
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = (arg) => {
  return <Comment {...arg} />;
};

export const Default = Template.bind({});
Default.args = {
  comment: {
    articleId: 1,
    createdAt: '2022-07-15T11:31:02.814Z',
    id: 89,
    published: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    updatedAt: '2022-07-15T11:31:02.815Z',
    user: { id: 4, name: 'Admin', email: 'admin@admin.com' },
    userId: 4,
  },
};
