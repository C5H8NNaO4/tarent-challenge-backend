import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '../config';

const saltRounds = Number(SALT_ROUNDS);
const args = process.argv.slice(2);
const password = args[0];

bcrypt.genSalt(saltRounds, function (_err, salt) {
    bcrypt.hash(password, salt, function (_err, hash) {
        console.log(hash);
    });
});

export {};
