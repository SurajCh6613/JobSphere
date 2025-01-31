import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken"

// Middleware funtion to check user authentication
export const isAuthenticated = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User is not authenticated.",400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
})

// function to check user is Authorized(Employer)
export const isAuthorized = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} not allowed to access this resource`,400))
        }
        next();
    }
}