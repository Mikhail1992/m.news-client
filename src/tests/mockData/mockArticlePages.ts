import { mockArticles } from './mockAtricles';

export const mockArticlesPages = {
  pageParams: [undefined] as any,
  pages: [
    {
      count: 4,
      data: [...mockArticles.slice(0, 4)],
      limit: 10,
      offset: 0,
    },
  ],
};

export const mockArticlesPages2 = {
  pageParams: [undefined] as any,
  pages: [
    {
      count: 12,
      data: [...mockArticles.slice(0, 10)],
      limit: 10,
      offset: 0,
    },
  ],
};

export const mockArticlesPages3 = {
  pageParams: [undefined, { offset: 10, limit: 10 }],
  pages: [
    {
      count: 12,
      data: [...mockArticles.slice(0, 10)],
      limit: 10,
      offset: 0,
    },
    {
      count: 12,
      data: [...mockArticles.slice(10)],
      limit: 10,
      offset: 10,
    },
  ],
};
