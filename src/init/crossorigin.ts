import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';

import { CLIENT_ORIGIN, NODE_ENV } from '../config';

export const csrfProtection = csrf({
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600,
    },
});

const corsOptions = {
    origin: [CLIENT_ORIGIN],
    credentials: true,
    optionsSuccessStatus: 200,
};

export const initCORS = (app) => {
    app.use(cors(corsOptions));
    app.use(bodyParser());
    app.use(cookieParser());

    if (NODE_ENV === 'production') {
        app.use(csrfProtection);

        /**
         * Sets a second cookie that needs to be returned with each request.
         * Note that setting this cookie, enables axios to *automagically* include it in a X-XSRF-Token header.
         * @see https://stackoverflow.com/a/66338080/1487756
         */
        app.use((req, res, next) => {
            res.cookie('XSRF-TOKEN', req.csrfToken());
            next();
        });
    }
};
