import { User } from './user';
export class Role {
    title: string;
    permissions: string;
    currentusers: Array<User>;
  }
  