import { Role } from './role';
import { userlist } from './userlist';
import { User } from './user';

export const roleslist: Role[] = [
    {title: "projectmanager",permissions:"project changes, read, edit", currentusers:[userlist[0]]},
    {title: "specificationsmanager",permissions: "project changes,user changes, read, edit, apply, delete", currentusers:[userlist[1]]},
    {title: "architect", permissions: "read, edit", currentusers:[userlist[2]]},
    {title: "visitor", permissions: "read", currentusers:[userlist[3]]}
];