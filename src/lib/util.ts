import crypto from 'crypto';
import { parse, format } from 'date-fns';
import { NODE_ENV } from '../config';

const formatString = 'dd.MM HH:mm';

export const randomSecretSync = () => crypto.randomBytes(64).toString('hex');

export const verifyTimeSlotParam = (dateString: string) => {
    try {
        return (
            format(
                parse(dateString, formatString, new Date()),
                formatString
            ) === dateString
        );
    } catch (e) {
        return false;
    }
};

export const failure = (res, error, status = 500) => {
    const response = {
        errorMessage: error.message,
        success: false,
    };

    if (NODE_ENV === 'production') {
        return res.status(status).send({
            success: false,
        });
    }

    return res.status(status).send(response);
};

export const success = (res, data) => {
    return res.status(200).send(data);
};
