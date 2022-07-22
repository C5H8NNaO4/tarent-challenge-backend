import { Permissions } from './permissions';
import bcrypt from 'bcrypt';

export const anon = {
    id: -1,
    name: 'anonymous',
    permissions: [Permissions.READ_TRAININGS],
    password: null,
};

export const users = [
    anon,
    {
        id: 0,
        name: 'admin',
        permissions: [
            Permissions.ADD_TRAINING,
            Permissions.UPD_TRAINING,
            Permissions.DEL_TRAINING,
            Permissions.READ_TRAININGS,
            Permissions.BOOK_TRAINING,
            Permissions.ADD_SLOT,
            Permissions.DEL_SLOT,
            Permissions.UPD_SLOT,
        ],
        password:
            '$2b$10$9FJLC92kSyciEMUvsTK/be9Ojw6klV/5Mk7WI4zpILYB5oZgmdyYy',
    },
    {
        id: 1,
        name: 'user',
        permissions: [Permissions.BOOK_TRAINING, Permissions.READ_TRAININGS],
        password:
            '$2b$10$3ZbV0SuIblXgDAPRZWOdL.JnHo.wAJk5WHT29M.Ym6D/7z/B8Cc7q',
    },
];

export const findUserById = (id) => {
    return users.find((user) => user.id === id);
};

export const findUserByName = (name) => {
    return users.find((user) => user.name === name);
};

export const verifyPassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if (!err && result) {
                resolve(true);
            } else {
                reject();
            }
        });
    });
};
