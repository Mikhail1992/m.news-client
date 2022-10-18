export interface ICredentials {
  email: string;
  password: string;
}

export enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

export interface IUser {
  id: number;
  name: string | null;
  email: string;
  role: Roles;
}
