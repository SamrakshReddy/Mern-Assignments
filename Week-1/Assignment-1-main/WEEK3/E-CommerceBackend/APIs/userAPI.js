import express from 'express';
export const userApp = express.Router();
import { UserModel } from '../schemas/userSchema.js';
import {ProductModel} from '../Schemas/productSchema.js';
import {hash} from 'bcryptjs';

//route to create a new user with hashing the password
//USER API ROUTES
userApp.post('/users', async (req, res) => {
    //get user obj from req body
    let newUser = req.body;
    await new UserModel(newUser).validate();
    //hash the password
    let hashedPassword=await hash(newUser.password,12);
    //replace plain password with hashed password
    newUser.password=hashedPassword;
    //insert user obj into db
    let newUserDoc = new UserModel(newUser); 
    //save
    await newUserDoc.save({validateBeforeSave:false});
    //save in database
    await newUserDoc.save();
    //send response
    res.status(201).json({ message: 'User created successfully'});
}
);
//add product to user in cart
userApp.put('/user-cart/user-Id/:uid/product-Id/:pid', async (req, res,next) => {
    //get uid and pid from req params    
    let {uid, pid} = req.params;
    console.log(uid);
    console.log(pid);
    //check user 
    let user = await UserModel.findById(uid);
    if(!user)
    {
        req.status(401).json({message:'User not found'});
        return;
    }
    //check product
    let Product =await ProductModel.findById(pid);
    console.log("product:",Product);
    if(!Product)
    {
        req.status(401).json({message:'Product not found'});
        return;
    }
    //perform updation 
    let modifiedUser=await UserModel.findByIdAndUpdate(
        uid,
        {$push:{cart:{product:pid}}},
        {new:true}).populate('cart.product');
    //send response
    res.status(200).json({message:'Product added to cart',payload:modifiedUser});
    
});

//read user by id 
userApp.get('/users/:uid', async (req, res,next) => {
    let {uid} = req.params;
    //find user 
    let user = await UserModel.findById(uid).populate('cart.product');
    //res
    res.status(200).json({ message: 'User details', payload: user });
});


userApp.put(
  "/user-cart-enhanced/user-Id/:uid/product-Id/:pid",
  async (req, res) => {
    try {
      const { uid, pid } = req.params;

      // check user
      const user = await UserModel.findById(uid);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // check product
      const product = await ProductModel.findById(pid);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // find product in cart
      const productInCart = user.cart.find(
        item => item.product.toString() === pid
      );

      if (productInCart) {
        // increment quantity
        productInCart.quantity += 1;
      } else {
        // add new product
         user.cart.push({ product: pid, quantity: 1 });
      }

      await user.save();

      res.status(200).json({message: "Cart updated successfully",cart: user.cart});
    } 
    catch (e) {
      res.status(500).json({message: "Internal Server Error"});
    }
  }
);

//compare the ids
userApp.get("/compare/:pid",async(req,res)=>{
  let productId =new Types.ObjectId(req.params.pid); //get product id from req.params.pid;
  //get product
  let product = await ProductModel.findById(productId);
  //compare ids
  if(productId===prod._id)//comapres values of ids(strict equality)
  {
    console.log("equal");
  }
  else
  {
    console.log("not equal");
  }
  res.status(200).json({message:"Product details",payload:product});
})
/*
if(prod._id.equals(productId))
{
  console.log("equal");
}
else
{
  console.log("not equal");
}
res.status(200).json({message:"Product details",payload:product});
})
*/