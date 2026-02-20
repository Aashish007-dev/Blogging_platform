import jwt from "jsonwebtoken";
import BlogModel from "../models/blog.model.js";
import CommentModel from "../models/comment.model.js";

export const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWROD) {
            return res.status(401).json({success: false, message: "Invalid credentials"});
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({success: true, message: "Login successful", token});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await BlogModel.find({}).sort({createdAt: -1});
        res.status(200).json({success: true, message: "Blogs fetched successfully", blogs});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const getAllComments = async (req, res) => {
    try {
        const comments = await CommentModel.find({}).populate("blog").sort({createdAt: -1});
        res.status(200).json({success: true, message: "Comments fetched successfully", comments}); 
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await BlogModel.find({}).toSorted({createdAt: -1}).limit(5);
        const blogs = await BlogModel.countDocuments();
        const comments = await CommentModel.countDocuments();
        const drafts = await BlogModel.countDocuments({isPublished: false});
        const dashboardData = {
            blogs,
            comments,
            drafts,
            recentBlogs
        }
        res.status(200).json({success: true, message: "Dashboard data fetched successfully", dashboardData});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}


export const deleteCommentById = async (req, res) => {
    try {
        const {id} = req.body;
        await CommentModel.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Comment deleted successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}


export const approveCommentById = async (req, res) => {
    try {
        const {id} = req.body;
        await CommentModel.findByIdAndUpdate(id, {isApproved: true});
        res.status(200).json({success: true, message: "Comment approved successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}