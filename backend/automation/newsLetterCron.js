import cron from "node-cron"
import {Job} from "../models/jobSchema.js"
import {User} from "../models/userSchema.js"
import {sendEmail} from "../utils/sendEmail.js"


export const newsLetterCron = ()=>{
    cron.schedule("*/1 * * * *",async()=>{//first star for minutes, second for hours, third for days,fourth for months,fifth for weekdays
        console.log("Running News Letter Cron Automation");
        
    })
}