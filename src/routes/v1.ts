import { Router } from 'express';
import passport from 'passport';

import { Permissions } from '../data/permissions';
import {
    addTimeSlotToTraining,
    bookTimeSlotForTraining,
    cancelTimeSlotForTraining,
    deleteTimeSlotFromTraining,
    getBookingsByTrainingId,
    logout,
    modifyTimeSlotOfTraining,
    sendBookingData,
    sendSessionUser,
    sendTrainingData,
} from '../lib/api';
import { hasPermission } from '../lib/middleware';

const router = Router();

router.get('/trainings', sendTrainingData);
router.get('/bookings', sendBookingData);

router.get('/login', passport.authenticate('session'), sendSessionUser);
router.post('/login', passport.authenticate('local'), sendSessionUser);
router.post('/logout', logout);

router.get('/training/:id/bookings', getBookingsByTrainingId);

router.post(
    '/training/:id/booking',
    passport.authenticate('session'),
    hasPermission(Permissions.BOOK_TRAINING),
    bookTimeSlotForTraining
);
router.delete(
    '/training/:id/booking/:timeSlot',
    passport.authenticate('session'),
    hasPermission(Permissions.BOOK_TRAINING),
    cancelTimeSlotForTraining
);

router.post(
    '/training/:id/slot',
    passport.authenticate('session'),
    hasPermission(Permissions.ADD_SLOT),
    addTimeSlotToTraining
);

router.delete(
    '/training/:id/slot/:timeSlot',
    passport.authenticate('session'),
    hasPermission(Permissions.DEL_SLOT),
    deleteTimeSlotFromTraining
);

router.put(
    '/training/:id/slot/:timeSlot',
    passport.authenticate('session'),
    hasPermission(Permissions.UPD_SLOT),
    modifyTimeSlotOfTraining
);

export default router;
