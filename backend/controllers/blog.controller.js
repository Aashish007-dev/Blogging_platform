import fs from "fs";
import imagekit from "../config/imageKit.js";
import BlogModel from "../models/blog.model.js";
import CommentModel from "../models/comment.model.js";

export const addBlog = async (req, res) => {
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if(!title || !description || !category || !imageFile) {
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        const fileBuffer = fs.readFileSync(imageFile.path);
        // upload image to imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality:'auto'},
                {format: 'webp'},
                {width: '1280'}
            ]
        })

        const image = optimizedImageUrl;

        await BlogModel.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished
        })

        res.status(201).json({success: true, message: "Blog added successfully"});

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find({isPublished: true});
        res.status(200).json({success: true, message: "Blogs fetched successfully", blogs});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const getBlogById = async (req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await BlogModel.findById(blogId);
        if(!blog) {
            return res.status(404).json({success: false, message: "Blog not found"});
        }
        res.status(200).json({success: true, message: "Blog fetched successfully", blog});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const {id} = req.body;
        await BlogModel.findByIdAndDelete(id);
        await CommentModel.deleteMany({blog: id});
        res.status(200).json({success: true, message: "Blog deleted successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}


export const togglePublish = async (req, res) => {
    try {
        const {id} = req.body;
        const blog = await BlogModel.findById(id);
        if(!blog) {
            return res.status(404).json({success: false, message: "Blog not found"});
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.status(200).json({success: true, message: "Blog Status Update successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}


export const addComment = async (req, res) => {
    try {
        const {blog, name, content} = req.body;
        if(!blog || !name || !content) {
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        await CommentModel.create({blog, name, content});
        res.status(201).json({success: true, message: "Comment added successfully"});
        
    } catch (error) {
         res.status(500).json({success: false, message: error.message});
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const {blogId} = req.body;
        const comments = await CommentModel.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.status(200).json({success: true, message: "Comments fetched successfully", comments});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }

}