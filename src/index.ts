import express, { Router } from 'express';

import { PORT } from './config';
import apiV1 from './routes/v1';
import './types/index';
import { initPassPort } from './init/passport';
import { initCORS } from './init/crossorigin';

const app = express();
const router = Router();

/**
 * Sets up CORS and CSRF protection.
 */
const { csrfProtection } = initCORS(app);
/**
 * Sets up session management and authentication.
 */
initPassPort(app);

router.use('/v1', apiV1);
app.use('/api', router);

app.listen(PORT, csrfProtection, () => {
    console.log(`Example app listening on PORT ${PORT}`);
});

export default app;
