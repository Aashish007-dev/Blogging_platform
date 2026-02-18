import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export default authMiddleware;