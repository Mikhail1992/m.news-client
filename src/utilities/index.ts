import { IUser, Roles } from '../types/user';

interface IFile {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export const validFormat = (value: IFile) => {
  return value.type ? ['image/jpg', 'image/jpeg'].includes(value.type) : true;
};

export const validSize = (value: IFile) => {
  return value.size ? value.size < 3145728 : true;
};

export const isAdmin = (user?: IUser) => user?.role === Roles.ADMIN;
export const isManager = (user?: IUser) => user?.role === Roles.MANAGER;

export const isResourceOwner = (user?: IUser, isCreator: boolean = false) => {
  const isManagerResource = isManager(user) && isCreator;
  return isAdmin(user) || isManagerResource;
};

export const isEditingEnabled = (user?: IUser, isCreator: boolean = false) => {
  return isAdmin(user) || isCreator;
};

export const isPublishingEnabled = (user?: IUser, published: boolean = false) => {
  return isAdmin(user) && !published;
};

export const isUnpublishingEnabled = (user?: IUser, published: boolean = false) => {
  return isAdmin(user) && published;
};

export const isDeletingEnabled = (
  user?: IUser,
  isCreator: boolean = false,
  published: boolean = false,
) => {
  return isAdmin(user) || (isCreator && !published);
};
