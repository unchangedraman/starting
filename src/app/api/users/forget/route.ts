import {connect} from "@/src/dbconfig/dbConfig";
import User from "@/src/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import {sendEmail} from "@/src/helpers/mailtrap";
connect();
export async function POST(request : NextRequest){
   try {
    const reqBody = await request.json();
    // const parsedBody = JSON.parse(JSON.stringify(reqBody));
    const {email} = reqBody;
    // const user = await User.findOne({email});
    // const email = await request.text(); // Get email directly from request body as text
    // // const trimmedEmail = email.trim();
    // const {email} = emaill;
    console.log(email.email);
    const user = await User.findOne({email});
    console.log(user);

    if(!user){
        return NextResponse.json({error: "User does not exist"}, {status: 400});
    }
    const response = await sendEmail({email, emailType: "FORGET", userId: user._id});
    // console.log(response);
   }
    catch (error: any) {
    console.log(error.message);
   }
   return NextResponse.json({message: "email sentttt"});
}