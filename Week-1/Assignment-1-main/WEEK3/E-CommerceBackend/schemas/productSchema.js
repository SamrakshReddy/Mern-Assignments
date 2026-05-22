/*
Product:
{
productName,
price,
brand
}
*/
import {Schema,model} from 'mongoose';

//create user schema(pid,productName,price)
const productSchema=new Schema({

    productName:{
        type:String,
        required:[true,'Product Name is required']},
    price:{
        type:Number,
        required:[true,'Price is required']},
    brand :{
        type:String,
        required:[true,'Brand is required']
    }
},{strict:"throw",
timestamps:true,
versionKey:false
});

//create product model
export const ProductModel=model('Product',productSchema);
