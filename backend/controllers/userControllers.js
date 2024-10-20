import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler, {errorMiddleware } from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import {sendToken} from "../utils/jwtTokens.js"
import { setDriver } from "mongoose";


export const register = catchAsyncError(async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      password,
      role,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverLetter,
    } = req.body;

    if (!name || !email || !phone || !address || !password || !role) {
      return next(new ErrorHandler("All fields are required.", 400));
    }
    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
      return next(
        new ErrorHandler("Please provide your preffered Niche.", 400)
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("Email is already registered", 400));
    }

    const userData = {
      name,
      email,
      phone,
      address,
      password,
      role,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
      },
      coverLetter,
    };

    if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            { folder: "Job_Seekers_Resume"}
          )
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(
              new ErrorHandler("Failed to upload resume to cloud", 500)
            );
          }
          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
          // console.log(cloudinaryResponse.secure_url);
          
        } catch (error) {
          return next(new ErrorHandler("Failed to upload resume", 500));
        }
      }
    }
    const user = await User.create(userData);
    sendToken(user,201,res,'User Registered')
  } catch (error) {
    next(error);
  }
});


// User Login Method
export const login = catchAsyncError(async(req,res,next)=>{
  const {role,email,password} = req.body; // getting user Data
  // Checking for if user not provide
  if(!role || !email || !password){
    return next(new ErrorHandler('Email, Password, and Role are required.',400))
  }
  // Getting User Password via checking with email - User exist or not
  const user = await User.findOne({email}).select("+password");
  if(!user){
    return next(new ErrorHandler("Invalid email or Password. From Email",400))
  }
  // Checking for password match
  const isPasswordMatched = await user.comparePassword(password);
  if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid email or Password. From Password",400))
  }
  //Checking for Role
  if(user.role !== role){
    return next(new ErrorHandler("Invalid User role.",400))
  }

  // If Everything good then login the user
  sendToken(user,200,res,"User Logged in Successfully")
})


// Logout Function
export const logout = catchAsyncError(async(req,res,next)=>{
  res.status(200).cookie("token","",{
    expires:new Date(Date.now()),
    httpOnly:true
  }).json({
    success:true,
    message:"Logged out successfully"
  })
})

// Funtion to get user - user getting its details
export const getUser = catchAsyncError(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
      success:true,
      user
    })
})