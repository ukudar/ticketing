import express from 'express';
require('express-async-errors');
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from '@raantickets/common';
import { createOrderRouter } from './routes/new';
import { indexOrderRouter } from './routes';
import { deleteOrderRouter } from './routes/delete';
import { showOrderRouter } from './routes/show';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
app.use(currentUser);

app.use(createOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);
app.use(showOrderRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };