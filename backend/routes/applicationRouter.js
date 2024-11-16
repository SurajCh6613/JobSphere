import express from "express"
import {isAuthenticated,isAuthorized} from "../middlewares/auth"
import { deleteApplication, employerGetAllApplication, jobSeekerGetAllApplication, postApplication } from "../controllers/applicationController.js";

const router = express.Router();

//Method to apply for job by job seeker only
router.post("/post/:id",isAuthenticated,isAuthorized("Job Seeker"),postApplication)

// Method to get all Application
router.get("/employer/getall",isAuthenticated,isAuthorized("Employer"),employerGetAllApplication)

// Method to get all applied application by job seeker
router.get("/jobseeker/getall",isAuthenticated,isAuthorized("Job Seeker"),jobSeekerGetAllApplication)

// Deleter a job application
router.delete('/delete/:id',isAuthenticated,deleteApplication)

export default router;