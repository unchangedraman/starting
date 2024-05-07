

// domain.com/verifytoken/ajdlfjlkdsjf // by this what we are doing is that we are taking the params and then assigning something 
// // try to use this in backend as this make it more easier

// domain.com/vefifytoken?token= jdfjdljfkl

// // try to use this in fronted for more easiability

import { error } from "console";
import nodemailer from "nodemailer";
import User from "../models/userModels";
import bcryptjs from 'bcryptjs';
export const sendEmail = async ({email,emailType,userId} : any) =>{
    try{
        // findbyidandupdate pahle find krta hai then database me update bhi krta hai and the field that have going to mention there only get updated
        const hashedToken = await bcryptjs.hash(userId.toString(),10); // 10 means round
        if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId,{verifyToken : hashedToken, verifyTokenExpiry: Date.now() + 3600000});
    }
        
        else if(emailType === "FORGET")
        {
            await User.findByIdAndUpdate(userId,{forgetPasswordToken : hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000});
        }
        var Transporter = nodemailer.createTransport({
            
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "44597477dbca7d",
                  pass: "6bdb5b855a9d4c"
                }
                // add these in env file
        
        });
        const MailOptions = {
            from: "ramantoxic@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Varification Email" : "Reset Password Email",
            html: `<p>click  here to ${emailType} ${process.env.DOMAIN}/verifytoken?token=${hashedToken}</p>`
            // html: `<p>click <a href = "${process.env.DOMAIN}/verifytoken?token=${hashedToken}">here</a> to ${emailType}</p>`
        }
        const MailOptions2 = {
            from: "ramantoxic@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Varification Email" : "Reset Password Email",
            html: `<p>click  here to ${emailType} ${process.env.DOMAIN}/setpassword?token=${hashedToken}</p>`
            // html: `<p>click <a href = "${process.env.DOMAIN}/verifytoken?token=${hashedToken}">here</a> to ${emailType}</p>`
        }
        if(emailType === "VERIFY"){
        const  mailresponse = await Transporter.sendMail(MailOptions);
        return mailresponse;
        }
        else if(emailType === "FORGET"){
            const  mailresponse2 = await Transporter.sendMail(MailOptions2);
        return mailresponse2;}
        }
        
    
    catch(err:any)
    {
        throw new Error(err.message);
    }


}