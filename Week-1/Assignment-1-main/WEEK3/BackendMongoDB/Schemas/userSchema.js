import {Schema,model} from 'mongoose';

//create user schema(username,password,age)
const userSchema=new Schema({
    username:{
        type:String,required:[true,'Username is required'],
        minlength:[4,'Minimum 4 characters required'],
        maxlength:[6,'Max length exceeded']},
    password:{
        type:String,
        required:[true,'Password is required']},
    age:{
        type:Number,
        required:[true,'Age is required'],
        min:[18,'Age should be above 18'],
        max:[25,'Age should be less than 25']}
},
{strict:"throw",
timestamps:true
}
);

//create user model
export const UserModel=model('User',userSchema);
