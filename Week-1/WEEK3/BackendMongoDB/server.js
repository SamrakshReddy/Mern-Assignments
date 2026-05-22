import exp from 'express';
import { userApp } from './APIs/UserAPI.js';
import { productApp } from './APIs/ProductAPI.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = exp();
const port = 4000;


// middleware (ALWAYS before routes)
app.use(exp.json());
//add cookie parser middleware
app.use(cookieParser());
// routes
app.use('/user-api', userApp);

//product api route
app.use('/product-api',productApp);

// DB connection + server start
async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/anuragdb2');
    console.log('Database connected successfully');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });

  } catch (err) {
    console.log('Database connection error:', err);
  }
}

connectDB();
