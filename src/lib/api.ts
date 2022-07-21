import { addBooking, bookings, trainingData } from '../data';
import {
    AddDuplicateItemError,
    BookedOut,
    InvalidId,
    MalformedInput,
    RemoveBookedItemError,
    RemoveNonExistingItemError,
    Unauthorized,
} from '../errors';
import { verifyTimeSlotParam, failure, success } from './util';

export const logout = (req, res) => {
    req.logOut((err) => {
        if (err) {
            return failure(res, new Error(err));
        }
        res.status(200).clearCookie('connect.sid', {
            path: '/',
        });
        req.session.destroy(() => {
            res.end();
        });

        return res.end();
    });
};

export const sendSessionUser = (req, res) => success(res, req.user);
export const sendTrainingData = (req, res) => success(res, trainingData);
export const sendBookingData = (req, res) => success(res, bookings);

export const getBookingsByTrainingId = (req, res) => {
    const { id } = req.params;

    const filtered = bookings.filter(
        (booking) => booking.trainingId === Number(id)
    );

    if (!trainingData[id]) {
        return failure(res, InvalidId(id), 500);
    }

    return success(res, filtered);
};

export const bookTimeSlotForTraining = (req, res) => {
    const { id } = req.params;
    const { timeSlot } = req.body;

    if (!verifyTimeSlotParam(timeSlot)) {
        return failure(res, MalformedInput('timeSlot'), 500);
    }

    if (!trainingData[id]) {
        return failure(res, InvalidId(id), 500);
    }

    const training = trainingData[id];
    const filtered = bookings.filter(
        (booking) =>
            booking.trainingId === Number(id) && booking.timeSlot === timeSlot
    );

    if (filtered.length === training.slots) {
        return failure(res, BookedOut, 401);
    }

    const booking = {
        trainingId: Number(id),
        userId: req.user.id,
        timeSlot,
    };

    addBooking(booking);

    return success(res, booking);
};

export const cancelTimeSlotForTraining = (req, res) => {
    const { id, timeSlot } = req.params;

    if (!trainingData[Number(id)]) {
        return failure(res, InvalidId(id), 500);
    }

    const booking = bookings.find(
        (item) =>
            item.trainingId === Number(id) &&
            item.timeSlot === timeSlot &&
            item.userId === req.user.id
    );

    const index = bookings.indexOf(booking);

    if (index === -1) {
        return failure(res, RemoveNonExistingItemError);
    }

    bookings.splice(index, 1);

    return success(res, booking);
};

export const addTimeSlotToTraining = (req, res) => {
    const { id } = req.params;
    const { timeSlot } = req.body;

    if (!verifyTimeSlotParam(timeSlot)) {
        return failure(res, MalformedInput('timeSlot'), 500);
    }

    if (!trainingData[id]) {
        return failure(res, InvalidId(id), 500);
    }

    const training = trainingData[id];

    if (training.availableTimeSlots.includes(timeSlot)) {
        return failure(res, AddDuplicateItemError);
    }

    training.availableTimeSlots.push(timeSlot);

    return success(res, training);
};

export const deleteTimeSlotFromTraining = (req, res) => {
    const { id, timeSlot } = req.params;

    if (!trainingData[id]) {
        return failure(res, InvalidId(id), 500);
    }

    const training = trainingData[id];

    if (!training.availableTimeSlots.includes(timeSlot)) {
        return failure(res, RemoveNonExistingItemError);
    }

    const filtered = bookings.filter(
        (booking) =>
            booking.trainingId === Number(id) && booking.timeSlot === timeSlot
    );

    if (filtered.length > 0) {
        return failure(res, RemoveBookedItemError);
    }

    const index = training.availableTimeSlots.indexOf(timeSlot);

    training.availableTimeSlots.splice(index, 1);

    return success(res, training);
};

export const modifyTimeSlotOfTraining = (req, res) => {
    const { id, timeSlot } = req.params;
    const { timeSlot: newTimeSlot } = req.body;

    if (!trainingData[id]) {
        return failure(res, InvalidId(id), 500);
    }

    const training = trainingData[id];
    const isBooked = bookings.some(
        (booking) =>
            booking.trainingId === Number(id) && booking.timeSlot === timeSlot
    );

    if (!training.availableTimeSlots.includes(timeSlot)) {
        return failure(res, RemoveNonExistingItemError);
    }

    if (training.availableTimeSlots.includes(newTimeSlot)) {
        return failure(res, AddDuplicateItemError);
    }

    if (isBooked) {
        return failure(res, RemoveBookedItemError);
    }

    const index = training.availableTimeSlots.indexOf(timeSlot);

    training.availableTimeSlots[index] = newTimeSlot;

    return success(res, training);
};
