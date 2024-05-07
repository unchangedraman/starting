import {connect} from "@/src/dbconfig/dbConfig";

import { NextRequest,NextResponse } from "next/server";
import User from "@/src/models/userModels";
import { NextDataPathnameNormalizer } from "next/dist/server/future/normalizers/request/next-data";

connect();
export async function POST(request : NextRequest)
{
    try{
        const reqbody = await request.json();
        const {Token} = reqbody;
        console.log(Token);
        const user = await User.findOne({verifyToken: Token});
        if(!user)
        {
            return NextResponse.json({error: "Innnvalid token"}, {status: 400});
        }
        console.log(user);
        //so basically now you can make a another call to database telling that you have varified the user by using that User(this one)
        // or user ka reference hai apne pass to simply yahi se user.isvarified  to change kr sakte hai
        user.isVarified = true;
        user.varifyToken = undefined;
        user.varifyTokenExpiry = undefined; // these are doing to flush out the data
        await user.save(); // await laga dena as it take time to save the user

        return NextResponse.json({message:"email varified", success: true});


    }
    catch(err:any)  
    {
        return NextResponse.json({error:err.message}, {status: 400});
    }
}
