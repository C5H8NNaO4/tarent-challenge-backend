export const trainingData = [
    {
        id: 0,
        name: 'JavaScript intermediate course',
        trainer: 'Peter Jahnsen',
        cost: 100,
        duration: 45,
        slots: 10,
        availableTimeSlots: ['25.07 10:00', '25.07 14:00', '25.07 15:00'],
        description: `
Get your JavaScript skills to the next level with this introductionary course for beginners.
You'll learn about the basics of JavaScript as well as advanced coding pragmas, data-structures, do's and don'ts.
        `,
    },
    {
        id: 1,
        name: 'React frontend development',
        trainer: 'Peter Jahnsen',
        cost: 150,
        duration: 45,
        slots: 1,
        availableTimeSlots: ['25.07 12:00', '25.07 14:00', '25.07 15:00'],
        description: `
Ever felt like creating blazing fast and stunning websites on your own?
This is the right course for you. It covers everything you need to get started developing modern SPAs at home.
        `,
    },
    {
        id: 2,
        name: 'TypeScript beginner course',
        trainer: 'Peter Jahnsen',
        cost: 150,
        duration: 45,
        slots: 5,
        availableTimeSlots: ['25.07 12:00', '25.07 14:00', '25.07 15:00'],
        description: `
Are you aware of the benefits of type-safety? If not, you should definitely check out this course.
It covers all the necesseties to start developing robust code.
        `,
    },
];

export const bookings = [
    { trainingId: 0, userId: -1, timeSlot: '25.07 10:00' },
];

export const addBooking = (booking) => bookings.push(booking);
