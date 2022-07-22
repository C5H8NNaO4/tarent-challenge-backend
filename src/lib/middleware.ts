import { failure } from './util';

import { Unauthorized } from '../errors';

export const hasPermission = (permission) => (req, res, next) => {
    const { user } = req;

    if (user && user?.permissions.includes(permission)) {
        next();
    } else {
        failure(res, Unauthorized, 403);
    }
};
