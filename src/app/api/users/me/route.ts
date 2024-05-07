import { getDataToken } from "@/src/helpers/getDataToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModels";
import { connect } from "@/src/dbconfig/dbConfig";
connect();
export async function GET(request:NextResponse)
{
    try{
        const userid =  await getDataToken(request);
        const user = await User.findOne({_id: userid}).select("-password");
        return NextResponse.json({message: "user found bro",
    data : user});
    }
    catch(err:any)
    {
        return NextResponse.json({error : err.message} , {status:400});

    }
}