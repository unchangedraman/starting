import {connect} from "@/src/dbconfig/dbConfig";
import User from "@/src/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({error: "Invalid credentials"}, {status: 400});
        }
        // return NextResponse.json({message: "Login successful", success: true, user});

        const tokenData = {
            userId: user._id,
            email : user.email,
        
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user,
            token
        }); // this is type of next response which can be used to get or set cookies or other things

        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response;

    }
    catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}