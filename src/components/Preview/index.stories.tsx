import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Grid from '../Grid';
import Preview, { THUMBNAIL_PREVIEW_TYPE } from './index';

export default {
  title: 'Preview',
  component: Preview,
} as ComponentMeta<typeof Preview>;

const Template: ComponentStory<typeof Preview> = (arg) => {
  return (
    <BrowserRouter>
      <Preview {...arg} />
    </BrowserRouter>
  );
};

const Template2: ComponentStory<typeof Preview> = (arg) => {
  return (
    <BrowserRouter>
      <Grid type="container">
        <Grid type="item" xs={3}>
          <Preview {...arg} />
        </Grid>
      </Grid>
    </BrowserRouter>
  );
};

export const Full = Template.bind({});
Full.args = {
  article: {
    id: 1,
    picture: 'https://ortodonta.com/wp-content/uploads/2021/03/girl-919048__340.jpg',
    title: 'I learn React',
    categoryId: 3,
    userId: 1,
    category: {
      id: 1,
      title: 'finance',
      url: 'finance',
      createdAt: '2020-03-03T12:00:00.000Z',
      updatedAt: '2020-03-03T12:00:00.000Z',
    },
    coverImage: '',
    views: 100,
    url: '#',
    _count: { comments: 25 },
    spoiler:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis, sem quis commodo malesuada, erat arcu ornare leo, ut volutpat metus erat at tellus. Maecenas metus tellus, rutrum porta condimentum id, lobortis vel dui. Vestibulum venenatis tincidunt porttitor. Vivamus tempor pharetra tellus, ac lacinia felis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis, sem quis commodo malesuada, erat arcu ornare leo, ut volutpat metus erat at tellus. Maecenas metus tellus, rutrum porta condimentum id, lobortis vel dui. Vestibulum venenatis tincidunt porttitor. Vivamus tempor pharetra tellus, ac lacinia felis.',
    content: '',
    createdAt: '2020-03-03T12:00:00.000Z',
    updatedAt: '2020-08-03T12:00:00.000Z',
  },
};

export const Thumbnail = Template2.bind({});
Thumbnail.args = {
  article: {
    id: 1,
    picture: 'https://ladywimbledon.com/wp-content/uploads/2020/02/red-lip-smile-edit-1024x910.jpg',
    title: 'Two Sides Of Programmer Freelancer Life',
    categoryId: 3,
    userId: 1,
    category: {
      id: 3,
      title: 'people',
      url: 'people',
      createdAt: '2020-03-03T12:00:00.000Z',
      updatedAt: '2020-03-03T12:00:00.000Z',
    },
    coverImage: '',
    views: 10,
    url: '#',
    _count: { comments: 27 },
    spoiler: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    content: '',
    createdAt: '2020-03-03T12:00:00.000Z',
    updatedAt: '2020-06-03T12:00:00.000Z',
  },
  type: THUMBNAIL_PREVIEW_TYPE,
};
