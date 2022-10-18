import { mockComments } from './mockComments';

export const mockCommentsPages = {
  pageParams: [undefined] as any,
  pages: [
    {
      count: 4,
      data: [...mockComments.slice(0, 4)],
      limit: 10,
      offset: 0,
    },
  ],
};
