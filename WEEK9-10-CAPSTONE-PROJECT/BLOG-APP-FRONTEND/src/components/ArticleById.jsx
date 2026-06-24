import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";

import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  primaryBtn,
} from "../styles/common.js";

const BASE_URL = import.meta.env.VITE_API_URL || "";

function ArticleByID() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/user-api/articles/${id}`,
          { withCredentials: true }
        );
        const data = res.data.payload;
        setArticle(data);
        setComments(data.comments || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    return d.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;
    setStatusLoading(true);
    try {
      await axios.patch(
        `${BASE_URL}/author-api/articles/${article._id}/status`,  // ✅ FIXED
        { isArticleActive: newStatus },
        { withCredentials: true }
      );
      setArticle((prev) => ({ ...prev, isArticleActive: newStatus }));
    } catch (err) {
      setError("Failed to update article status");
    } finally {
      setStatusLoading(false);
    }
  };

  const editArticle = () => {
    navigate(`/edit-article/${article._id}`, { state: article });
  };

  const addComment = async () => {
    if (!comment.trim()) return;
    try {
      const res = await axios.post(
        `${BASE_URL}/user-api/articles/${article._id}/comments`,  // ✅ FIXED
        { comment },
        { withCredentials: true }
      );
      setComments((prev) => [...prev, res.data.payload]);
      setComment("");
    } catch (err) {
      console.error("COMMENT ERROR:", err.response?.data || err.message);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(
        `${BASE_URL}/author-api/comments/${commentId}`,  // ✅ FIXED
        { withCredentials: true }
      );
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (!article) return null;

  const isDeleted = article.isArticleActive === false;

  return (
    <div className={articlePageWrapper}>
      <div className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors duration-200">
        <button onClick={() => navigate(-1)}>← Back</button>
      </div>
      {error && <p className={errorClass}>{error}</p>}
      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>
        <h1 className={`${articleMainTitle} uppercase`}>{article.title}</h1>
        <div className={articleAuthorRow}>
          <div className={authorInfo}>{article.author?.firstName || "Author"}</div>
          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>
      <div className={articleContent}>{article.content}</div>
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          {!isDeleted ? (
            <>
              <button className={editBtn} onClick={editArticle}>Edit</button>
              <button className={deleteBtn} onClick={toggleArticleStatus} disabled={statusLoading}>
                {statusLoading ? "Processing..." : "Delete"}
              </button>
            </>
          ) : (
            <button className={primaryBtn} onClick={toggleArticleStatus} disabled={statusLoading}>
              {statusLoading ? "Processing..." : "Restore"}
            </button>
          )}
        </div>
      )}
      <div className={articleFooter}>Last updated: {formatDate(article.updatedAt)}</div>
      <hr className="mt-8" />
      {!isDeleted && (
        <>
          {user && (
            <div className="mt-6">
              <textarea
                className="w-full border rounded-xl p-3"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={addComment} className={`${primaryBtn} mt-3`}>Post Comment</button>
            </div>
          )}
          <div className="mt-8">
            {comments.length === 0 ? (
              <p>No comments yet</p>
            ) : (
              comments.map((c) => (
                <div key={c._id} className="border rounded-xl p-4 mt-3">
                  <div className="flex justify-between text-sm">
                    <span>{c.user?.firstName || "User"}</span>
                    <span>{formatDate(c.createdAt)}</span>
                  </div>
                  <p className="mt-2">{c.comment}</p>
                  {user?.role === "AUTHOR" && (
                    <button onClick={() => deleteComment(c._id)} className="text-red-500 text-xs mt-2">
                      Delete
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ArticleByID;