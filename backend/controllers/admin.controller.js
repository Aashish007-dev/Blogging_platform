

export const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({success: false, message: "Invalid credentials"});
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({success: true, message: "Login successful", token});
    } catch (error) {
        
    }
}