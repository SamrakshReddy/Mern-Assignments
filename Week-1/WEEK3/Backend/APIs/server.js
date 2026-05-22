//create HTTP server

//Import express module
import express from "express";
import {userApp} from "./userAPI.js";
import {productApp} from "./productAPI.js";

//how to create mini express application

//create server
const app=express();

//assign the port number
app.listen(3000,()=>{
console.log("HTTP server listening on port 3000..")
})

//body paesing middleware
app.use(express.json())

//mount userApp with path /userapi
app.use('/user-api',userApp);
//mount productApp with path /productapi
app.use('/product-api',productApp);