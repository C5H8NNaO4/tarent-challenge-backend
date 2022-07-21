export const trainingData = [
    {
        id: 0,
        name: 'JavaScript intermediate course',
        trainer: 'Peter Jahnsen',
        cost: 100,
        duration: 45,
        slots: 10,
        availableTimeSlots: ['25.07 10:00', '25.07 14:00', '25.07 15:00'],
    },
    {
        id: 1,
        name: 'React frontend development',
        trainer: 'Peter Jahnsen',
        cost: 150,
        duration: 45,
        slots: 1,
        availableTimeSlots: ['25.07 12:00', '25.07 14:00', '25.07 15:00'],
    },
    {
        id: 2,
        name: 'TypeScript beginner course',
        trainer: 'Peter Jahnsen',
        cost: 150,
        duration: 45,
        slots: 5,
        availableTimeSlots: ['25.07 12:00', '25.07 14:00', '25.07 15:00'],
    },
];

export const bookings = [{ trainingId: 0, userId: -1, timeSlot: '10:00' }];

export const addBooking = (booking) => bookings.push(booking);
