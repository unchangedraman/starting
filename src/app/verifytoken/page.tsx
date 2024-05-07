"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Varifytoken(){
    const [Token,SetToken]  = useState("");
    const [Varified,SetVarified] = useState(false);
    const [error,SetError] = useState(false);
    const varificationmail = async()  => {
        try {
             await axios.post('/api/users/varifyemail',{Token});
             SetVarified(true);
        } catch (error : any) {
            SetError(true);
            console.log(error.response.data); // we are taking error response and data because axios may send error in this way

        }
    }
    useEffect(() => {
        const url = window.location.search.split("=")[1]; // means uske left ki value already 0 ho jaayegi aur right wali as a token behave kregi
        console.log(url)
        SetToken(url || "");
        console.log(Token);
    },[])
    useEffect(() => {
        if(Token.length>0) varificationmail();
    },[Token])
    return (
        <div className="p-4 flex flex-col item-center justify-center">
            <h1 className="text-4xl">Varify Email</h1>
            <h2 className="text-2xl bg-red-500"> { Token ? `${Token}` : "no token"} </h2>
            {Varified && (
                <div>
                    <h2>Varified</h2>
                    <Link href = '/login'>Login</Link>

                    </div>
            )}
            {
                error && <h2>Varification Failed</h2>
            }
        </div>
    )
}