import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataToken = (request : NextResponse) => {
    try{
        const token = request.cookies.get('token')?.value || '';
        // jwt.verify not just varify the token but still it extract all the information as response
        const decoded:any = jwt.verify(token,process.env.TOKEN_SECRET!);
        console.log(decoded);
        return decoded.userId;
    }
    catch(err:any)
    {
        throw new Error(err.message);
    }
}
