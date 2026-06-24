import {Schema,model} from 'mongoose';

//create user schema(pid,productName,price)
const productSchema=new Schema({
    pid:{
        type:Number,
        required:[true,'Product Id is required']},
    productName:{
        type:String,
        required:[true,'Product Name is required']},
    price:{
        type:Number,
        required:[true,'Price is required']}
},
//{strict:"throw",
//timestamps:true
//}
);
export const ProductModel=model('Product',productSchema);
