import express from 'express';
import { ProductModel } from '../Schemas/productSchema.js';
export const productApp = express.Router();

//route to create a new product
productApp.post('/products', async (req, res, next) => {
    //request body
    let  newProduct = req.body;
    console.log(newProduct);
    //create product model object
    let newProductDoc= new ProductModel(newProduct);
    //save to database
    await newProductDoc.save();
    //send response
    res.status(201).json({ message: 'Product created successfully', product: newProductDoc });
});