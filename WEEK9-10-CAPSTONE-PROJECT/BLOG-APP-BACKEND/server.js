import exp from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { userRoute } from './APIs/UserAPI.js';
import { authorRoute } from './APIs/AuthorAPI.js';
import { adminRoute } from './APIs/AdminAPI.js';
import { commonRoute } from './APIs/CommonAPI.js';

config();

// create express app
const app = exp();

// enable CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-training-lemon.vercel.app", 
    ],
    credentials: true,
  })
);
// body parser
app.use(exp.json());

// cookie parser
app.use(cookieParser());

// routes
app.use('/user-api', userRoute);
app.use('/author-api', authorRoute);
app.use('/admin-api', adminRoute);
app.use('/common-api', commonRoute);

// connect DB
const connectDB = async () => {
  try {

    await connect(process.env.DB_URL);

    console.log("DB connection successful");

    app.listen(process.env.PORT || 4000, () =>
      console.log("Server started on port 4000...")
    );

  } 
  catch (err) {
    console.log("Error in DB connection:", err.message);
  }
};

connectDB();


// global error handler
app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];

    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  // handle custom errors
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});