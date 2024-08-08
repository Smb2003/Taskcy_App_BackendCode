const { verify } = require("jsonwebtoken");
const { User_Schema } = require("../Models/UserSchema");

const Check_auth_middleware =  async (req,res,next) => {
    try {
        const header_Token = req.headers.authorization;
        if(!header_Token){
            return res.status(401).json({success: false, message: 'Invalid token'});
        }
        const token = header_Token.split(' ')[1];
        const verify_token = verify(token,process.env.JWT_SECTRET_KEY);
        if(!verify_token){
            return res.status(401).json({success: false, message: 'Invalid token'})
        }
        const userID = verify_token.userId;
        const  find_user = await User_Schema.findById(userID).select('-Password');
        
        req.user = find_user;
        next();
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal server error!'})
    }
} 

module.exports = {Check_auth_middleware}