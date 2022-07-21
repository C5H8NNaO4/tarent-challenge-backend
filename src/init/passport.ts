import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

import {
    anon,
    findUserById,
    findUserByName,
    verifyPassword,
} from '../data/users';
import { SESSION_SECRET } from '../lib/secrets';

export const initPassPort = (app) => {
    passport.use(
        new LocalStrategy(async function (username, password, done) {
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

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        try {
            const user = findUserById(id);
            done(null, user);
        } catch (e) {
            done(e, false);
        }
    });
};
