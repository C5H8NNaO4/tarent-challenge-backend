import {
    addTimeSlotToTraining,
    bookTimeSlotForTraining,
    cancelTimeSlotForTraining,
    deleteTimeSlotFromTraining,
    deleteTraining,
    getBookingsByTrainingId,
    modifyTimeSlotOfTraining,
    sendTrainingData,
    upsertTraining,
} from './api';

import { bookings, trainingData } from '../data/index';

const send = jest.fn((x) => x);
const status = jest.fn(() => ({ send }));

let lastAddedTraining;

describe('API Test Suite', () => {
    it('lists all trainings', () => {
        sendTrainingData(null, {
            status,
            send,
        });
        expect(send.mock.lastCall[0]).toBe(trainingData);
    });

    it('adds a training', () => {
        upsertTraining(
            {
                params: {},
                body: {
                    name: 'Jenkins Course',
                    trainer: 'Douglas Crockford',
                    duration: 45,
                    cost: 500,
                    createNew: true,
                },
            },
            {
                status,
                send,
            }
        );

        // eslint-disable-next-line prefer-destructuring
        lastAddedTraining = send.mock.lastCall[0];

        expect(lastAddedTraining).toStrictEqual({
            availableTimeSlots: [],
            cost: 500,
            duration: 45,
            id: 3,
            name: 'Jenkins Course',
            trainer: 'Douglas Crockford',
        });
        expect(trainingData.length).toBe(4);
    });

    it('modifies a training', () => {
        upsertTraining(
            {
                params: {
                    id: lastAddedTraining.id,
                },
                body: {
                    name: 'Jenkins Course',
                    trainer: 'Douglas Crockford',
                    duration: 45,
                    cost: 450,
                },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toStrictEqual({
            availableTimeSlots: [],
            cost: 450,
            duration: 45,
            id: 3,
            name: 'Jenkins Course',
            trainer: 'Douglas Crockford',
        });
    });

    it('deletes a training', () => {
        deleteTraining(
            {
                params: {
                    id: lastAddedTraining.id,
                },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toStrictEqual({
            availableTimeSlots: [],
            cost: 450,
            duration: 45,
            id: 3,
            name: 'Jenkins Course',
            trainer: 'Douglas Crockford',
        });
        expect(trainingData.length).toBe(3);
    });

    it('lists bookings for a training', () => {
        getBookingsByTrainingId(
            {
                params: { id: 0 },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toEqual(
            bookings.filter((booking) => booking.trainingId === 0)
        );
    });

    it('allows booking a timeslot for a training', () => {
        bookTimeSlotForTraining(
            {
                user: {
                    id: 0,
                },
                params: { id: 0 },
                body: {
                    timeSlot: '25.07 14:00',
                },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toEqual({
            trainingId: 0,
            userId: 0,
            timeSlot: '25.07 14:00',
        });
    });

    it('verifies input parameters to make sure it is a valid date string', () => {
        bookTimeSlotForTraining(
            {
                user: {
                    id: 0,
                },
                params: { id: 0 },
                body: {
                    timeSlot: "<script>alert('hi')</script>",
                },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toEqual({
            errorMessage: "Malformed input in field 'timeSlot'.",
            success: false,
        });
    });

    it('fails removing a nonexistent booking', () => {
        cancelTimeSlotForTraining(
            {
                user: {
                    id: 0,
                },
                params: { id: 0 },
                body: {
                    timeSlot: '25.12 14:00',
                },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toEqual({
            errorMessage: 'Cannot remove nonexisting item.',
            success: false,
        });
    });

    it('allows cancelling a booking to a training', () => {
        cancelTimeSlotForTraining(
            {
                user: {
                    id: -1,
                },
                params: { id: '0', timeSlot: '25.07 10:00' },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toEqual({
            trainingId: 0,
            userId: -1,
            timeSlot: '25.07 10:00',
        });
    });

    it('fails adding an existing timeslot to a training', () => {
        addTimeSlotToTraining(
            {
                user: {
                    id: -1,
                },
                params: { id: '0' },
                body: {
                    timeSlot: '25.07 10:00',
                },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toEqual({
            errorMessage: 'Cannot add duplicate timeslot.',
            success: false,
        });
    });

    it('allows adding a new timeslot to a training', () => {
        const training = trainingData[0];
        const availableTimeSlots = [...training.availableTimeSlots];
        addTimeSlotToTraining(
            {
                user: {
                    id: -1,
                },
                params: { id: '0' },
                body: {
                    timeSlot: '25.07 11:00',
                },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toEqual({
            ...training,
            availableTimeSlots: [...availableTimeSlots, '25.07 11:00'],
        });
    });

    it("doesn't allow removing a timeslot that has been booked", () => {
        deleteTimeSlotFromTraining(
            {
                user: {
                    id: -1,
                },
                params: { id: '0', timeSlot: '25.07 14:00' },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toEqual({
            errorMessage: 'Cannot remove timeslot that have been booked.',
            success: false,
        });
    });

    it('allows removing a timeslot that has not been booked', () => {
        const training = trainingData[0];
        deleteTimeSlotFromTraining(
            {
                user: {
                    id: -1,
                },
                params: { id: '0', timeSlot: '25.07 15:00' },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toEqual({
            ...training,
            availableTimeSlots: ['25.07 10:00', '25.07 14:00', '25.07 11:00'],
        });
    });

    it('allows updating a timeslot', () => {
        const training = trainingData[0];
        modifyTimeSlotOfTraining(
            {
                user: {
                    id: -1,
                },
                params: { id: '0', timeSlot: '25.07 11:00' },
                body: { timeSlot: '25.07 17:00' },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toEqual({
            ...training,
            availableTimeSlots: ['25.07 10:00', '25.07 14:00', '25.07 17:00'],
        });
    });

    it('does not allow updating a timeslot to an existing one', () => {
        modifyTimeSlotOfTraining(
            {
                user: {
                    id: -1,
                },
                params: { id: '0', timeSlot: '25.07 10:00' },
                body: { timeSlot: '25.07 14:00' },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toEqual({
            errorMessage: 'Cannot add duplicate timeslot.',
            success: false,
        });
    });

    it("does not allow updating a timeslot if it's booked", () => {
        modifyTimeSlotOfTraining(
            {
                user: {
                    id: -1,
                },
                params: { id: '0', timeSlot: '25.07 14:00' },
                body: { timeSlot: '25.07 18:00' },
            },
            {
                status,
                send,
            }
        );
        expect(send.mock.lastCall[0]).toEqual({
            errorMessage: 'Cannot remove timeslot that have been booked.',
            success: false,
        });
    });
});
