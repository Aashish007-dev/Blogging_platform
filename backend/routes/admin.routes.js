import express from "express";
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get('/comments', authMiddleware, getAllComments);
router.get('/blogs', authMiddleware, getAllBlogsAdmin);
router.post('/delete-comment', authMiddleware, deleteCommentById );
router.post('/approve-comment', authMiddleware, approveCommentById );
router.post('/dashboard', authMiddleware, getDashboard );


export default router;