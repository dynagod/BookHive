import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static('public'));
app.use(cookieParser());




// routes import

import orderRouter from './routes/order.route.js';
import bookRouter from './routes/book.route.js';
import adminRouter from './routes/admin.route.js';

app.use('/api/admin', adminRouter);
app.use('/api/books', bookRouter);
app.use('/api/orders', orderRouter);

export { app };