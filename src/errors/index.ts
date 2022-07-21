import { NODE_ENV } from '../config';

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
    'Cannot remove nonexisting item.'
);
export const MalformedInput = (field) =>
    new Error(`Malformed input in field '${field}'.`);

export const InvalidId = (id) =>
    new Error(`Invalid id '${id}' passed to route`);
