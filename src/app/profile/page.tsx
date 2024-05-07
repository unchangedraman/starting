"use client"; // this page is although a csr but where we are requesting a params that will not be any random page.
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React , {useState} from "react";
// window.location.search this will give everything after the ? in the search bar
export default function profile()
{
    const router = useRouter();
    const [data,setData]   = useState("Nothing");
    const logout = async () => {
        
        try{
            const data = await axios.get("/api/users/logout");
            router.push("/login");
        }
        catch(err : any)
        {
            console.log(err.message);
            toast.error(err.message);
        }
    }
    const getuserdetails = async() =>{
        const res = await axios.get("/api/users/me");
        console.log(res.data); // as we passed on data as data from user so res.data.data.user will have everything about the user

        setData(res.data.data._id);
    }

    return ( 
        <div>
            <h1>this is a profile page</h1>
            <h5>by here we will get params and render it in backend</h5>
            <hr>
            </hr>
            <h2>{data === "Nothing" ? "NOthing" : <Link href={`/profile/${data}`} >{data}</Link>}</h2>
            <button onClick={getuserdetails}>get user details</button>
            <button className="p-2 border border-gray-300 rounded-md"
            onClick = {logout}>
                Logout
            </button>
        </div>
    )
}