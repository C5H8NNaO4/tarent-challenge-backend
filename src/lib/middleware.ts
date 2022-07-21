import { Unauthorized } from '../errors';
import { failure } from './util';

export const hasPermission = (permission) => (req, res, next) => {
    const { user } = req;

    if (user && user?.permissions.includes(permission)) {
        next();
    } else {
        failure(res, Unauthorized, 403);
    }
};
