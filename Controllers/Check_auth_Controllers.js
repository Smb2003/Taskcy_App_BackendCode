const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { User_Schema } = require("../Models/UserSchema");
const JWT_Token = require('jsonwebtoken')

const SignUp_Controller = async (req,res) => {
  try {
    const body = req.body;
    console.log(body)
    const salt = genSaltSync(10);
    const hash_password = hashSync(body.Password,salt);
    console.log(hash_password);
    const create_user = await User_Schema.create({
        ...body,Password:hash_password
    })
    console.log(create_user);
    if(!create_user){
        return res.status(400).json({message: 'User not created'})
    }
    return res.status(200).json({success: true, data: create_user, message: 'User registered successfully!'
    })
  } catch (error) {
    return res.status(500).json({success: false, message: 'Internal server error!'})
  }
}

const Login_Controller = async (req,res) => {
  try {
    const body = req.body;
    const UserId = await User_Schema.findOne({Email: body.Email});
    if(!UserId){
      return res.status(401).json({success: false, message: "Unauthorized user"}) 
    }
    const cmp_Password = compareSync(body.Password,UserId.Password);
    if(!cmp_Password){
      return res.status(401).json({success: false, message: "Unauthorized user"}) 
    }
    const JWT_Payload = {
      userId: UserId._id
    }
    const Generate_Token = JWT_Token.sign(JWT_Payload,process.env.JWT_SECTRET_KEY,{expiresIn: '1h'});

    return res.status(200).json({success: true,data: UserId, message: 'LoggedIn successfully!',access_token : Generate_Token })
  } catch (error) {
    return res.status(500).json({success: false, message: 'Internal server error!'})
  }
}

const Check_auth_Controller = async (req,res) => {
  try {
    const user = req.user;
    return res.status(200).json({success: true, message: 'User available!', data: user});
  } catch (error) {
    return res.status(500).json({success: false, message: 'Internal server error!'})
  }
}
module.exports = {SignUp_Controller,Login_Controller,Check_auth_Controller}
