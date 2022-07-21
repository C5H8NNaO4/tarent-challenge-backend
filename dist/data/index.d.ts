export declare const trainingData: {
    id: number;
    name: string;
    trainer: string;
    cost: number;
    duration: number;
    slots: number;
    availableTimeSlots: string[];
}[];
export declare const bookings: {
    trainingId: number;
    userId: number;
    timeSlot: string;
}[];
export declare const addBooking: (booking: any) => number;
