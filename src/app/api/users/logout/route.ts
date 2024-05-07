// basically we will just flush out the token that will be present in the browser

import { NextResponse } from "next/server";

export async function GET() {
    try{
        const response = NextResponse.json({
            message: "Logout Successfull",
            success: true,
        });
        response.cookies.set("token", "" , {httpOnly: true, expires: new Date(0)}); // we can only logout by http onlyl we don't need to manually write about exp
        return response;

    }
    catch(err : any)
    {
        return NextResponse.json({error : err.message},
        {status : 400});


    }
}