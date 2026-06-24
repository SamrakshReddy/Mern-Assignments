import exp from 'express'
import {login} from '../services/authService.js'
import {UserTypeModel} from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
export const commonRoute=exp.Router()
import { ArticleModel } from "../models/ArticleModel.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

//login
commonRoute.post("/login", async (req, res) => {
  try {
    const userCred = req.body;
    const { token, user } = await login(userCred);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true
    });

    //send token in body so frontend can store it
    res.status(200).json({ message: "Login Success", payload: user, token });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Login failed" });
  }
});

//logout
commonRoute.get("/logout",async(req,res)=>{
    //logout for User,Author and Admin
  //clear the coookie named 'token'
  //must match the original settings 
 // logout cookie - TO
res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none",  // must match login settings exactly
});
  res.status(200).json({ message: "Logout success" });
  
})
//change password(protected route)
commonRoute.put('/change-password',async(req,res)=>{
    //get current password and new password
    const { email, currentPassword, newPassword } = req.body;
    //check the current password
    const user = await UserTypeModel.findOne({email});

    const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isMatch) {
        return res.status(401).json({
            message: "Current password is incorrect"
        });
    }
    //replace the current password with new password
     const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save()
    //send res
     res.json({ message: "Password changed successfully" });
});


// Fetch all active articles
commonRoute.get("/articles", async (req, res) => {
  try {
    const articles = await ArticleModel.find({ isArticleActive: true })
      .populate("author", "firstName lastName email role"); // ← add email here
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch articles" });
  }
});

//page refresh 
commonRoute.get(
  "/check-auth",
  verifyToken("USER", "AUTHOR", "ADMIN"),
  async (req, res) => {
    try {
      console.log("Decoded user:", req.user);

      const user = await UserTypeModel.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log("DB user:", user);

      res.status(200).json({
        message: "authenticated",
        payload: user,
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  }
);