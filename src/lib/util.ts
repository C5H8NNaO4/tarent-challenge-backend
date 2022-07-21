import crypto from 'crypto';

export const randomSecretSync = () => crypto.randomBytes(64).toString('hex');
