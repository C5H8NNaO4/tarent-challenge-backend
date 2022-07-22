/**
 * Provides typesafety / intellisense support for process.env variables.
 * @see https://stackoverflow.com/a/53981706/1487756
 */
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            SALT_ROUNDS?: string;
        }
    }
}

export {};
