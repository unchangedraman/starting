"use client";
import axios from "axios";
import Link from "next/link";
import React,{ useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Varifytoken(){
    const router = useRouter();
    const [Token,SetToken]  = useState("");
    const [Varified,SetVarified] = useState(false);
    const [error,SetError] = useState(false);
    const [user, setUser] = React.useState({
        password: "",
        confirmpass: ""
    });
    const setpassword = async()  => {
        try {
             await axios.post('/api/users/setpassword',{Token,user});
             router.push('/login');
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
    },[])
    useEffect(() => {
        if(Token.length>0) setpassword();
    },[Token])
    return (
        <div className="p-4 flex flex-col item-center justify-center">
            <h1 className="text-4xl">Varify password</h1>
            <h2 className="text-2xl bg-red-500"> { Token ? `${Token}` : "no token"} </h2>
            <label htmlFor="email">Password</label>
            <input 
            id="password"
            type="password" 
            placeholder="Password"
            value = {user.password}
            onChange = {(e) => setUser({...user, password: e.target.value})}
            />
            <label htmlFor="email">Confirm Password</label>
            <input 
            id="confirmpass"
            type="password" 
            placeholder="Confirm Password"
            value = {user.confirmpass}
            onChange = {(e) => setUser({...user, confirmpass: e.target.value})}
            />
            <button onClick={() => setpassword()} 
            className="p-2 border border-gray-300 rounded-md focus: outline-none -scroll-ml-6"> 
                Set Password</button>
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