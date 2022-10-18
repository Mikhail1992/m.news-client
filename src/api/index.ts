import { IArticle } from '../types/article';
import { ICategory } from '../types/category';
import { IComment } from '../types/comment';
import { IFetchingListData } from '../types/common';
import { ICreatedArticle, IUpdatedArticle } from '../types/form';
import { ICredentials, IUser, Roles } from '../types/user';
import api from './interceptors';

export default class QueryHandler {
  static async fetchCategories() {
    const { data } = await api.get<ICategory[]>(`/categories`);
    return data;
  }

  static async createCategory(category: Pick<ICategory, 'title' | 'url'>) {
    const { data } = await api.post<ICategory>(`/categories`, category);
    return data;
  }

  static async fetchArticles(offset: number = 0, limit: number = 10) {
    const { data } = await api.get<IFetchingListData<IArticle>>(
      `/articles?offset=${offset}&limit=${limit}`,
    );
    return data;
  }

  static async fetchDraftArticles(offset: number = 0, limit: number = 10) {
    const { data } = await api.get<IFetchingListData<IArticle>>(
      `/articles/draft?offset=${offset}&limit=${limit}`,
    );
    return data;
  }

  static async fetchPopularArticles(offset: number = 0, limit: number = 4) {
    const { data } = await api.get<IFetchingListData<IArticle>>(
      `/articles/popular?offset=${offset}&limit=${limit}`,
    );
    return data;
  }

  static async fetchArticleByUrl(url: string) {
    const { data } = await api.get<IArticle>(`/articles/${url}`);
    return data;
  }

  static async fetchPrivateArticleByUrl(url: string) {
    const { data } = await api.get<IArticle>(`/articles/${url}/private`);
    return data;
  }

  static async fetchArticlesByCategoryUrl(url: string, offset: number = 0, limit: number = 10) {
    const { data } = await api.get<IFetchingListData<IArticle>>(
      `/articles/category/${url}?offset=${offset}&limit=${limit}`,
    );
    return data;
  }

  static async publishArticle(id: number, published: boolean = false) {
    const { data } = await api.post<IArticle>(`/articles/${id}/publish`, { published });
    return data;
  }

  static async deleteArticle(id: number) {
    await api.delete<void>(`/articles/${id}`);
  }

  static async createArticle(createArticleData: ICreatedArticle) {
    await api.post<{}>(`/articles/`, createArticleData);
  }

  static async updateArticle(updateArticleData: IUpdatedArticle) {
    const { data } = await api.patch<IArticle>(
      `/articles/${updateArticleData.id}`,
      updateArticleData,
    );
    return data;
  }

  static async register(user: ICredentials) {
    await api.post<void>(`/auth/register`, user);
  }

  static async login(user: ICredentials) {
    const { data } = await api.post<{ accessToken: string; user: IUser }>(`/auth/login`, user);
    return data;
  }

  static async forgotPassword(email: string) {
    const { data } = await api.post<{ url: string }>(`/auth/forgot-password`, { email });
    return data;
  }

  static async restorePassword(password1: string, password2: string, token: string) {
    await api.post<void>(`/auth/restore-password`, {
      password1,
      password2,
      token,
    });
  }

  static async fetchToken() {
    const { data } = await api.get<{ accessToken: string }>(`/auth/token`);
    return data;
  }

  static async logout() {
    await api.get<void>(`/auth/logout`);
  }

  static async fetchMe() {
    const { data } = await api.get<{ user: IUser }>(`/users/me`);
    return data;
  }

  static async fetchUsers() {
    const { data } = await api.get<IFetchingListData<IUser>>(`/users`);
    return data;
  }

  static async updateUser(id: number, role: Roles) {
    await api.patch<void>(`/users/${id}`, { role });
  }

  static async createComment(articleId: number, text: string) {
    const { data } = await api.post<IComment>(`/comments`, {
      text,
      articleId,
    });

    return data;
  }

  static async fetchArticleComments(offset: number = 0, limit: number = 10, articleId: number) {
    const { data } = await api.get<IFetchingListData<IComment>>(
      `/comments/article/${articleId}?offset=${offset}&limit=${limit}`,
    );
    return data;
  }

  static async fetchDraftComments(offset: number = 0, limit: number = 10) {
    const { data } = await api.get<IFetchingListData<IComment>>(
      `/comments/draft?offset=${offset}&limit=${limit}`,
    );

    return data;
  }

  static async publishComment(id: number) {
    const { data } = await api.post<IComment>(`/comments/${id}/publish`);
    return data;
  }

  static async deleteComment(id: number) {
    await api.delete<void>(`/comments/${id}`);
  }

  static async uploadImage(images: FormData): Promise<Record<string, string>> {
    const { data } = await api.post<Record<string, string>>(`/images/upload`, images);
    return data;
  }

  static async deleteImage(image: string[]) {
    const { data } = await api.post('/images/delete', image);
    return data;
  }
}
