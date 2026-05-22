/*
User
{
name,
email,
password,,
cart:[]}    
*/
import {Schema,model} from 'mongoose';

//create cart schema
const cartSchema=new Schema({
    product:
        {
            type:Schema.Types.ObjectId, //predefined in mongoose
            ref:'Product'//name of the product model
        },
    quantity:
    {
    type: Number,
    default: 1,
    min: 1
    }
});

//create user schema(username,password,age)
const userSchema=new Schema({
    name:{
        type:String,required:[true,'Name is required'],
        },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:[true,"dupe userr"] //its not a validation rule , its an option only[add to index] 
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    cart:[cartSchema]
},
{strict:"throw",
timestamps:true
}
);

//create user model
export const UserModel=model('User',userSchema);
