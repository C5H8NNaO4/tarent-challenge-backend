require('dotenv').config();

const {
    PORT = '3000',
    NODE_ENV = 'development',
    CLIENT_ORIGIN = 'http://localhost:3000',
    SALT_ROUNDS,
} = process.env;

export { PORT, NODE_ENV, SALT_ROUNDS, CLIENT_ORIGIN };
