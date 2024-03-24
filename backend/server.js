import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; 
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import ProductRoute from './routes/ProductRoute.js';
import userRoute from './routes/userRoutes.js';
import orderRoute from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const port=process.env.PORT || 4000;

connectDB(); //connect to MongoDB

const app=express();
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cookie parser middleware
app.use(cookieParser());

app.get('/',(req,res) =>{
    res.send('API is running...');
});
app.use('/api/products',ProductRoute);
app.use('/api/users',userRoute);
app.use('/api/orders',orderRoute);
app.use('/api/uploads',uploadRoutes);


app.get('/api/config/paypal', (req,res)=> res.send({clientId:
process.env.PAYPAL_CLIENT_ID}));

const __dirname = path.resolve(); 
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=> console.log(`Server running on port ${port}`));

