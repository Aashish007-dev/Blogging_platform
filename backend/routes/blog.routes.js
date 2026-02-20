import express from "express";
import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogById, getBlogComments, togglePublish } from "../controllers/blog.controller.js";
import upload from "../middleware/multer.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/add", upload.single("image"),authMiddleware, addBlog);
router.get("/all", getAllBlogs);
router.get("/:blogId", getBlogById);
router.post("/delete", authMiddleware,deleteBlogById);
router.post("/toggle-publish", authMiddleware,togglePublish);

router.post('/add-comment', addComment);
router.post('/comments', getBlogComments);



export default router;