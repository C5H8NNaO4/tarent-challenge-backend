import express, { Router } from 'express';

import { PORT } from './config';
import { csrfProtection, initCORS } from './init/crossorigin';
import { initPassPort } from './init/passport';
import apiV1 from './routes/v1';
import './types/index';

const app = express();
const router = Router();

initCORS(app);
initPassPort(app);

router.use('/v1', apiV1);
app.use('/api', router);

app.listen(PORT, csrfProtection, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening on PORT ${PORT}`);
});

export default app;
