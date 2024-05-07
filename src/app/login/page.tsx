"use client";  // now you can use your client component like window location and everything
// as these all thing are server side so its good to use use client
import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import {toast } from "react-hot-toast";
import axios from "axios";
export default function logIn()
{
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });
    const [buttondisabled, setDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const login = async() => {
        try{
            setLoading(true); // by this we can know something is happening
            const response = await axios.post("/api/users/login", user); // means signup me saara data leke jaana chahte hai and all it
            console.log("login suxxessful" ,response.data);
            router.push("/profile");
        }
        catch(err: any)
        {
            console.log("login failed" , err.message);
            toast.error(err.message);
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0)
        {
            setDisabled(false);
        }
        else
        {
            setDisabled(true);
        }
    }, [user])
    return (
        <div>
            <h1 >
            {loading ? "loading" : "LogIn"}
                
            </h1>
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
            <button onClick={login} className="p-2 border border-gray-300 rounded-md focus: outline-none -scroll-ml-6"> Login here</button>
            <Link href="/signup">go to Signup page </Link>
            <Link href = '/forget'>Forget Password</Link>
        </div>
    )
}