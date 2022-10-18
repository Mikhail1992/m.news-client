import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gallery from '../Gallery/Gallery';
import Article from './index';

export default {
  title: 'Article',
  component: Article,
} as ComponentMeta<typeof Article>;

const Template: ComponentStory<typeof Article> = (arg) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Article {...arg}></Article>}>
          <Route path="image" element={<Gallery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export const Default = Template.bind({});

Default.args = {
  article: {
    id: 1,
    picture: 'https://ortodonta.com/wp-content/uploads/2021/03/girl-919048__340.jpg',
    title: 'My project',
    categoryId: 3,
    userId: 1,
    category: {
      id: 1,
      title: 'people',
      url: 'people',
      createdAt: '2020-03-03T12:00:00.000Z',
      updatedAt: '2020-03-03T12:00:00.000Z',
    },
    coverImage: '',
    views: 10,
    url: '#',
    spoiler: 'Lorem ipsum dolor sit amet ...',
    createdAt: '2020-03-03T12:00:00.000Z',
    updatedAt: '2020-03-03T12:00:00.000Z',
    content: `  ### Public pages:

- 👽 Home page
- 😈 Category page
- 😎 Detail page
- 😇 Sign In
- 😱 Sign Up
- 😋 Forgot Password
- 😐 Restore Password

### Private pages:

- 😶 Unpublished articles (available for managers and admins)
- 😲 Create new category (available for managers and admins)
- 😝 Create new article (available for managers and admins)
- 😍 Credentials (available for admins)

## <a id="what-we-use"></a>What do we use in the project

### Common for client/server

- ✨ [typescript](https://www.typescriptlang.org)
- ✨ [prettier](https://prettier.io)
- ✨ [eslint](https://eslint.org/)
- ✨ [husky](https://github.com/typicode/husky)
- ✨ [jest](https://jestjs.io/)`,
  },
};
