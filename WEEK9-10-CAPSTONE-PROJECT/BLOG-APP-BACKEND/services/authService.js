import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {UserTypeModel} from "../models/UserModel.js";
import {config} from "dotenv";
config();
//register section
export const register = async (userObj) => {
    //create document
    const user=new UserTypeModel(userObj);
    //validate for empty password
    await user.validate();
    //hash and replace plain password
    user.password=await bcrypt.hash(user.password,10);
    //save
    const created=await user.save();
    //convert document to object to remove password
    const newUserObj=created.toObject();
    //remove password
    delete newUserObj.password;
    //return
    return newUserObj;
};

//authenticate function
export const login = async ({ email, password }) => {
  if (!email || !password) {
    const err = new Error("Email and password required")
    err.status = 400
    throw err
  }

  const user = await UserTypeModel.findOne({ email })
  if (!user) {
    const err = new Error("Invalid Email or Password")
    err.status = 401
    throw err
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    const err = new Error("Invalid Email or Password")
    err.status = 401
    throw err
  }

  if (!user.isActive) {
    const err = new Error("User inactive. Contact admin")
    err.status = 403
    throw err
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  )

  const userObj = user.toObject()
  delete userObj.password

  return { token, user: userObj }
}