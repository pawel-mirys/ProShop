import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT;
await connectDB();
const app = express();

//body parser md
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser md

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is rinning...');
});

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);

app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
