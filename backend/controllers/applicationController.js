import { catchAsynErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";

export const postApplication = catchAsynErrors(async (req, res, next) => {});

export const employerGetAllApplication = catchAsynErrors(
  async (req, res, next) => {}
);
export const jobSeekerGetAllApplication = catchAsynErrors(
  async (req, res, next) => {}
);
export const deleteApplication = catchAsynErrors(async (req, res, next) => {});
