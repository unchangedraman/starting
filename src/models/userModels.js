import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: {
        type : String,
        required : [true,"please provide a user name"],
        unique : true,
    },
    email:{
        type : String,
        required : [true,"please provide a email"],
        unique : true,
    },
    password:{
        type : String,
        required : [true,"please provide a password"],
    },
    isVarified:{
        type : Boolean,
        default : false,
    },
    // isAdmin ki jagah role kr sakte ho
    isAdmin:{
        type : Boolean,
        default : false,
    },
    forgetPasswordToken: {
        type: String,
        default: null
    },
    forgetPasswordTokenExpiry: {
        type:Date,
        default: null},

    verifyToken: {type:String,
        default:null},

    verifyTokenExpiry: {type:Date, default: null}


});
const User = mongoose.models.users || mongoose.model("users", UserSchema);
export default User;
