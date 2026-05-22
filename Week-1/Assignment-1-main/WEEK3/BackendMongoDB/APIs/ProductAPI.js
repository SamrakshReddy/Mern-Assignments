/*
### Product APIs
product onj schema :{pid,productName,price}
1.POST /products
2.GET /products
3.GET /products/<pid>
4.PUT /products/<pid>
*/
import express from 'express';
import { ProductModel } from '../Schemas/productSchema.js';
export const productApp = express.Router();

//PRODUCT API ROUTES
productApp.post('/products', async (req, res) => {
    //get product obj from req body
    let newProduct = req.body;      
    //insert product obj into db
    let newProductDoc = new ProductModel(newProduct);
    console.log(newProductDoc);      
    //save in database
    await newProductDoc.save();    
    //send response
    res.status(201).json({ message: 'Product created successfully'});
});
//create route to get all products
productApp.get('/products', async(req, res) => {
    //fetch all products from db
    const productsList=await ProductModel.find()
    //send response
    res.status(200).json({message:'Products fetched successfully',payload:productsList});
});
//read product by pid
productApp.get('/products/:pid', async(req, res) => {
    //get product pid from req params       
    let pid=req.params.pid;
    //fetch product from db by pid
    let productObj=await ProductModel.findById(pid);
    //send response
    res.status(200).json({message:'Product fetched successfully',payload:productObj});
});
//update user by id 
productApp.put('/products/:pid', async(req, res) => {
    //get product pid from req params
    let pid=req.params.pid;
    //get modified product from req body
    let modifiedProduct=req.body;
    console.log(modifiedProduct);
    //update product in db by pid
    let latestProduct=await ProductModel
    .findByIdAndUpdate(pid,{$set:{...modifiedProduct}},{new:true});
    //send response
    res.status(200).json({message:'Product updated successfully',payload:latestProduct});
});