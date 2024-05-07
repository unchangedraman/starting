import {connect} from "@/src/dbconfig/dbConfig";

import { NextRequest,NextResponse } from "next/server";
import User from "@/src/models/userModels";
import bcryptjs from "bcryptjs";
connect();
export async function POST(request : NextRequest)
{
    try{
        const reqbody = await request.json();
        const {Token,user} = reqbody;
        const {password,confirmpass} = user;
        console.log(Token);
        const userr = await User.findOne({forgetPasswordToken: Token});
        if(!userr)
        {
            return NextResponse.json({error: "Innnvalid token"}, {status: 400});
        }
        console.log(userr);
        if(password !== confirmpass)
        {
            return NextResponse.json({error: "passwords do not match"}, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        userr.password = hashedPassword;
        userr.isVarified = true;
        userr.varifyToken = undefined;
        userr.varifyTokenExpiry = undefined; // these are doing to flush out the data
        userr.forgetPasswordToken = undefined;
        userr.forgetPasswordTokenExpiry = undefined;
        await userr.save(); // await laga dena as it take time to save the user

        return NextResponse.json({message:"pasqword set", success: true});


    }
    catch(err:any)  
    {
        return NextResponse.json({error:err.message}, {status: 400});
    }
}
