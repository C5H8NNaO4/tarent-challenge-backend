import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import {
    anon,
    findUserById,
    findUserByName,
    verifyPassword,
} from '../data/users';
import { SESSION_SECRET } from '../lib/secrets';

export const initPassPort = (app) => {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            const user = findUserByName(username);

            if (!user) {
                return done(null, false);
            }

            if (user.id === -1) {
                return done(null, anon);
            }

            try {
                await verifyPassword(password, user.password);
            } catch (e) {
                return done(null, false);
            }

            return done(null, user);
        })
    );

    app.use(
        session({
            secret: SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: { secure: false },
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        try {
            const user = findUserById(id);
            done(null, user);
        } catch (e) {
            done(e, false);
        }
    });
};
