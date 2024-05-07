"use client";  // now you can use your client component like window location and everything
// as these all thing are server side so its good to use use client
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast } from "react-hot-toast";
export default function signup()
{
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });
    const [buttondisabled, setDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup = async() => {
        try{
            setLoading(true);
           const response =  await axios.post("/api/users/signup", user); // means signup me saara data leke jaana chahte hai and all it
           console.log("signup suxxessful", response.data); // 
           router.push("/login");
        }
        catch(err:any)
        {
            console.log("signupppp failed" , err);
            toast.error(err.message);
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0)
        {
            setDisabled(false);
        }
        else
        {
            setDisabled(true);
        }
    },[user])
    return (
        <div>
            <h1>
                Signup
            </h1>
            <hr />
            <label htmlFor="username" >username</label>
            <input 
            className="p-2 border border-gray-300 rounded-md focus: outline-none -scroll-ml-6 "
            id = "username"
            type = "text"
            value = {user.username}
            onChange = {(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            />
            <hr />
            <label htmlFor="email" >email</label>
            <input 
            className="p-2 border border-gray-300 rounded-md focus: outline-none -scroll-ml-6 "
            id = "email"
            type = "email"
            value = {user.email}
            onChange = {(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
            <hr />
            <label htmlFor="password" >password</label>
            <input 
            className="p-2 border border-gray-300 rounded-md focus: outline-none -scroll-ml-6 "
            id = "password"
            type = "password"
            value = {user.password}
            onChange = {(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <br />
            <button onClick={onSignup} 
            className="p-2 border border-gray-300 rounded-md focus: outline-none -scroll-ml-6"> 
            {buttondisabled ? "nosignup" : "signup"}</button>
            <Link href="/login">go to login page </Link>
        </div>
    )
}