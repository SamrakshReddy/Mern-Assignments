import express from 'express';
import { UserModel } from '../Schemas/userSchema.js';
import {hash,compare} from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import {verifyToken} from '../Middlewares/verifyToken.js';
export const userApp = express.Router();

//USER API ROUTES
userApp.post('/users', async (req, res) => {
    //get user obj from req body
    let newUser = req.body;
    //hash the password
    let hashedPassword=await hash(newUser.password,12);
    //replace plain password with hashed password
    newUser.password=hashedPassword;
    //insert user obj into db
    let newUserDoc = new UserModel(newUser); 
    console.log(newUserDoc);      
    //save in database
    await newUserDoc.save();
    //send response
    res.status(201).json({ message: 'User created successfully'});
}
);
//create route to get all users
//read user
userApp.get('/users', async(req, res) => {
    //fetch all users from db
    const usersList=await UserModel.find()
    //send response
    res.status(200).json({message:'Users fetched successfully',payload:usersList});

});

//read users by id
userApp.get('/users/:id', async(req, res) => {
    //get user id from req params
    let objId=req.params.id;
    //fetch user from db by id
    let userObj=await UserModel.findById(objId);
    //send response
    res.status(200).json({message:'User fetched successfully',payload:userObj});
});

//update user 
userApp.put('/users/:id', async(req, res) => {
    //get user id from req params
    let objId=req.params.id;
    //get modified user from req body
    let modifiedUser=req.body;
    console.log(modifiedUser);
    //update user in db by id
    let latestUser=await UserModel.findByIdAndUpdate(objId,{$set:{...modifiedUser}},{new:true});
    //send response
    res.status(200).json({message:'User updated successfully',payload:latestUser});
})

//delete user
userApp.delete('/users/:id', async(req, res) => {
    //get user id from req params
    let objId=req.params.id;
    //delete user from db by id
    let deletedUser=await UserModel.findByIdAndDelete(objId);
    //send response
    res.status(200).json({message:'User deleted successfully',payload:deletedUser});
})


//user authentication route(login)
userApp.post('/auth',async(req,res)=>{
    //get user credentials object
    let userCred=req.body;
    //find user by username
    let userOfDB=await UserModel.findOne({username:userCred.username});
    //if user not found
    if(userOfDB===null)
    {
        return res.status(404).json({message:'Authentication[Login] failed: Invalid username'});
    
    }
    //if user found compare the passwords
    let status =await compare(userCred.password,userOfDB.password);
    //if passwords do not match
    if(status===false)
    {
        return res.status(404).json({message:'Authentication[Login] failed: Invalid password'});
    }
    //create signed token
    let signedToken=jwt.sign({username:userCred.username},
        'abcdef',
        {expiresIn:30});
    //save token as hhtpOnly cookie in client(browser)
    res.cookie('token',signedToken,{httpOnly:true,secure:false,sameSite:'lax'});
    //send response with signed token
    res.status(200).json({message:'Login successful'});
});

//test protected route
userApp.get('/test',verifyToken,(req,res)=>{
    res.json({message:"test route",user:req.decodedToken});
});