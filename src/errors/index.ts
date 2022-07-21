import { NODE_ENV } from '../config';

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

export const InvalidRouteError = new Error('Invalid route');
export const Unauthorized = new Error('Unauthorized');
export const BookedOut = new Error('No slots available.');

export const AddDuplicateItemError = new Error(
    'Cannot add duplicate timeslot.'
);
export const RemoveBookedItemError = new Error(
    'Cannot remove timeslot that have been booked.'
);
export const RemoveNonExistingItemError = new Error(
    'Cannot remove nonexisting timeslot.'
);

export const InvalidId = (id) =>
    new Error(`Invalid id '${id}' passed to route`);
