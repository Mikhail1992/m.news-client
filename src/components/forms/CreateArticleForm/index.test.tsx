import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockCategories } from '../../../tests/mockData/mockCategories';
import { ICreatedArticle, IUploadImages } from '../../../types/form';
import CreateArticleForm from './';

const mockCreateArticle = jest.fn(async (data: ICreatedArticle): Promise<void> => {
  Promise.resolve(data);
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
      <CreateArticleForm
        categories={mockCategories}
        uploadImage={mockUploadImage}
        createArticle={mockCreateArticle}
      />,
    );
  });

  it('should not display error when value is valid', async () => {
    const titleInput = screen.getByRole('title');
    const urlInput = screen.getByRole('url');
    const spoilerInput = screen.getByRole('spoiler');
    const contentInput = screen.getByTitle('content');
    const button = screen.getByRole('button', { name: /Save Article/i });

    userEvent.type(titleInput, 'Title');
    userEvent.type(urlInput, 'url');
    userEvent.type(spoilerInput, 'spoiler...');
    userEvent.type(contentInput, 'content');
    await act(async () => {
      userEvent.click(button);
    });

    expect(screen.queryAllByRole('alert')).toHaveLength(0);
    await waitFor(() => expect(mockUploadImage).toBeCalledTimes(1));
    expect(mockCreateArticle).toBeCalledTimes(1);
  });

  it('should display required error when input values is empty', async () => {
    const button = screen.getByRole('button', { name: /Save Article/i });
    await act(async () => {
      fireEvent.submit(button);
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    expect(button).toBeDisabled();
    expect(mockCreateArticle).not.toBeCalled();
  });
});
