import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { validate } from "node-cron";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain at least 3 character"],
    maxLength: [30, "Name cannot exceed 30 character"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  niches: {
    firstNiche: String,
    secondNiche: String,
    thirdNiche: String,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain at least 8 character"],
    maxLength: [32, "Password cannot exceed 32 character"],
    select:false,
  },
  resume: {
    public_id: String,
    url: String,
  },
  coverLetter: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// Encrypting Password method
userSchema.pre("save",async function (next) {
  if(!this.isModified("password")){
    next()
  }
  this.password = await bcrypt.hash(this.password,10)
})

// Function to compare Entered Password with Encypted Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)  
}

// Method for getting token for user
userSchema.methods.getJWTToken = function(){
  return jwt.sign({id:this.id}, process.env.JWT_SECRET_KEY,{
    expiresIn:process.env.JWT_EXPIRE,
  })
}

export const User = mongoose.model("User", userSchema);
