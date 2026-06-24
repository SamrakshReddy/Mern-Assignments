import exp from "express";
import { register, login } from "../services/authService.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { verifyToken } from "../Middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

export const userRoute = exp.Router();

//Register user
userRoute.post("/users", upload.single("profileImageUrl"), async (req, res, next) => {
  let cloudinaryResult;

  try {
    //getb user obj
    let userObj = req.body;

    //  Step 1: upload image to cloudinary from memoryStorage (if exists)
    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }

    // Step 2: call existing register()
    const newUserObj = await register({
      ...userObj,
      role: "USER",
      profileImageUrl: cloudinaryResult?.secure_url,
    });

    res.status(201).json({
      message: "user created",
      payload: newUserObj,
    });
  } catch (err) {
    // Step 3: rollback
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }

    next(err); // send to your error middleware
  }
});

//Read all articles(protected route)
userRoute.get("/articles", verifyToken("USER"), async (req, res) => {
  //read articles of all authors which are active
  const articles = await ArticleModel.find({ isArticleActive: true }).populate("author");
  //send res
  res.status(200).json({ message: "all articles", payload: articles });
});


//next() ---> next middleware
//next(err) ---> error handling middleware
// Get single article by ID
userRoute.get("/articles/:id", verifyToken("USER", "AUTHOR"), async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id)
      .populate("author", "firstName")
      .populate("comments.user", "firstName"); // required for comments

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({
      message: "article",
      payload: article,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch article" });
  }
});
//comments

userRoute.post("/articles/:id/comments", verifyToken("USER", "AUTHOR"), async (req, res) => {
  try {
    const { comment } = req.body;

    const article = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            user: req.user._id,
            comment,
          },
        },
      },
      { new: true }
    ).populate("comments.user", "firstName");

    const newComment = article.comments[article.comments.length - 1];

    res.status(201).json({
      message: "comment added",
      payload: newComment,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
});