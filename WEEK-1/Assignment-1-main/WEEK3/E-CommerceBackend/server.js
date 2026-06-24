// create HTTP server
import exp from 'express';
import mongoose from 'mongoose';
import { userApp } from './APIs/userAPI.js';
import { productApp } from './APIs/productAPI.js';

const app = exp();
const PORT = 4000;

// middleware
app.use(exp.json());

// routes
app.use('/user-api', userApp);
app.use('/product-api', productApp);

// error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
    reason: err.message
  });
});

// connect to database and start server
async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecomDB');
    console.log('Connected to MongoDB database');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

connectDB();
