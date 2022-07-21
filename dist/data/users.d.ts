import { Permissions } from './permissions';
export declare const anon: {
    id: number;
    name: string;
    permissions: Permissions[];
    password: any;
};
export declare const users: {
    id: number;
    name: string;
    permissions: Permissions[];
    password: any;
}[];
export declare const findUserById: (id: any) => {
    id: number;
    name: string;
    permissions: Permissions[];
    password: any;
};
export declare const findUserByName: (name: any) => {
    id: number;
    name: string;
    permissions: Permissions[];
    password: any;
};
export declare const verifyPassword: (password: any, hash: any) => Promise<unknown>;
