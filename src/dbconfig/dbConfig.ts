import mongoose from "mongoose";
import { connected } from "process";
export async function connect()
{
    try{
        // MAKING a exclamation it will gurantee that  it is not null
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection; // this will give a string which help us to achive many event by this we can listen about many events
        // every event is listen by word on
        connection.on('connected',()=>{
            console.log("connected to db");
        });
        connection.on('error', (err) => {
            console.log(err);
        })

    }
    catch(error)
    {
        console.log(error);
        console.log("unable to connect to db");
    }
}