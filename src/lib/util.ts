import crypto from 'crypto';
import { parse, format } from 'date-fns';

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
