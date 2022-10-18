import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { mockArticle } from '../../../tests/mockData/mockArticle';
import { mockCategories } from '../../../tests/mockData/mockCategories';
import { IArticle } from '../../../types/article';
import { IUploadImages } from '../../../types/form';
import UpdateArticleForm from './';

const mockUpdateArticle = jest.fn(async (): Promise<IArticle> => {
  return Promise.resolve({
    categoryId: 1,
    content: 'content',
    coverImage: 'http://minio.com/news-images/1659435412874.jpg',
    createdAt: '2022-08-02T10:16:53.097Z',
    id: 63,
    picture: 'http://minio.com/news-images/1659435412874.jpg',
    published: false,
    spoiler: 'spoiler...',
    title: 'updated',
    updatedAt: '2022-08-02T13:49:33.968Z',
    url: 'url1',
    userId: 1,
    views: 0,
  });
});

const mockUploadImage = jest.fn(async (): Promise<IUploadImages> => {
  return Promise.resolve({
    picture: 'http://pictures.com/images/picture.jpg',
    coverImage: 'http://pictures.com/images/picture.coverImage',
  });
});

describe('CreateArticleForm', () => {
  beforeEach(() => {
    render(
      <UpdateArticleForm
        article={mockArticle}
        categories={mockCategories}
        uploadImage={mockUploadImage}
        updateArticle={mockUpdateArticle}
      />,
      { wrapper: BrowserRouter },
    );
  });

  it('should not display required error if submut without changes', async () => {
    const button = screen.getByRole('button', { name: /Update Category/i });

    await act(async () => {
      fireEvent.submit(button);
    });

    expect(button).toBeEnabled();
    expect(screen.queryAllByRole('alert')).toHaveLength(0);
    expect(button).not.toBeDisabled();
    expect(mockUpdateArticle).toBeCalled();
  });

  it('should not display error when value is valid', async () => {
    const titileInput = screen.getByRole('title');
    const urlInput = screen.getByRole('url');
    const spoilerInput = screen.getByRole('spoiler');
    const contentInput = screen.getByTitle('content');
    const button = screen.getByRole('button', { name: /Update Category/i });

    userEvent.clear(titileInput);
    userEvent.type(titileInput, 'Title');
    userEvent.clear(urlInput);
    userEvent.type(urlInput, 'url');
    userEvent.clear(spoilerInput);
    userEvent.type(spoilerInput, 'spoiler...');
    userEvent.clear(contentInput);
    userEvent.type(contentInput, 'content');
    await act(async () => {
      userEvent.click(button);
    });

    expect(button).toBeEnabled();
    expect(screen.queryAllByRole('alert')).toHaveLength(0);
    await waitFor(() => expect(mockUploadImage).toBeCalledTimes(1));
    expect(mockUpdateArticle).toBeCalledTimes(1);
  });

  it('should display error when value is empty', async () => {
    const titileInput = screen.getByRole('title');
    const urlInput = screen.getByRole('url');
    const contentInput = screen.getByTitle('content');
    const button = screen.getByRole('button', { name: /Update Category/i });

    userEvent.clear(titileInput);
    userEvent.clear(urlInput);
    userEvent.clear(contentInput);
    await act(async () => {
      userEvent.click(button);
    });

    expect(await screen.findByText(/title is a required field/i)).toBeInTheDocument();
    expect(await screen.findByText(/url is a required field/i)).toBeInTheDocument();
    expect(await screen.findByText(/content is a required field/i)).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    await waitFor(() => expect(mockUploadImage).toBeCalledTimes(0));
    expect(mockUpdateArticle).toBeCalledTimes(0);
  });
});
