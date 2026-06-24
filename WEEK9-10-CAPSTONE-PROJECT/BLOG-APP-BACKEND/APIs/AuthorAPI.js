import exp from "express";
import { register } from "../services/authService.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { verifyToken } from "../Middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";

export const authorRoute = exp.Router();

// Register author (public)
authorRoute.post("/authors", upload.single("profileImageUrl"), async (req, res, next) => {
  let cloudinaryResult;

  try {
    let userObj = req.body;

    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }

    const newUserObj = await register({
      ...userObj,
      role: "AUTHOR",
      profileImageUrl: cloudinaryResult?.secure_url,
    });

    res.status(201).json({
      message: "user created",
      payload: newUserObj,
    });
  } catch (err) {
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    next(err);
  }
});

// Create article (protected)
authorRoute.post("/articles", verifyToken("AUTHOR"), async (req, res) => {
  let article = {
    ...req.body,
    author: req.user._id,
  };

  let newArticleDoc = new ArticleModel(article);
  let createdArticleDoc = await newArticleDoc.save();

  res.status(201).json({
    message: "article created",
    payload: createdArticleDoc,
  });
});

// Read articles of author (protected)
authorRoute.get("/articles/:authorId", verifyToken("AUTHOR"), async (req, res) => {
  let aid = req.params.authorId;
  let articles = await ArticleModel.find({ author: aid }).populate("author", "firstName email");
  res.status(200).json({ message: "articles", payload: articles });
});

// Edit article (protected)
authorRoute.put("/articles", verifyToken("AUTHOR"), async (req, res) => {
  console.log(req.body);
  let author = req.user._id; // fixed from req.user.userId

  let { articleId, title, category, content } = req.body;
  console.log(articleId, author);

  let articleOfDB = await ArticleModel.findOne({ _id: articleId, author: author });
  console.log(articleOfDB);
  if (!articleOfDB) {
    return res.status(401).json({ message: "Article not found" });
  }

  let updatedArticle = await ArticleModel.findByIdAndUpdate(
    articleId,
    { $set: { title, category, content } },
    { new: true }
  );

  res.status(200).json({ message: "article updated", payload: updatedArticle });
});

// Soft delete article (protected)
authorRoute.patch("/articles/:id/status", verifyToken("AUTHOR"), async (req, res) => {
  const { id } = req.params;
const isArticleActive = req.body.isArticleActive === true || req.body.isArticleActive === "true";

  const article = await ArticleModel.findById(id);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  console.log("article.author:", article.author.toString());
  console.log("req.user._id:", req.user._id.toString());
  console.log("match:", article.author.toString() === req.user._id.toString());

  // req.user.userId
  if (req.user.role === "AUTHOR" && article.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Forbidden. You can only modify your own articles" });
  }

  if (article.isArticleActive === isArticleActive) {
    return res.status(400).json({
      message: `Article is already ${isArticleActive ? "active" : "deleted"}`,
    });
  }

  article.isArticleActive = isArticleActive;
  await article.save();

  res.status(200).json({
    message: `Article ${isArticleActive ? "restored" : "deleted"} successfully`,
    payload: article,
  });
});



// Delete comment (AUTHOR only)
authorRoute.delete("/comment/:commentId", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const { commentId } = req.params;

    const article = await ArticleModel.findOneAndUpdate(
      { "comments._id": commentId },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});