import { Permission } from './permission';

export type Group = {
    id: string;
    name: string;
    password: string;
    age: number;
    permissions: Array<Permission>;
}
