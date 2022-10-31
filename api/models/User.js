import mongoose from 'mongoose';
const { Schema } = mongoose;



const userSchema = new Schema({
  username:{
    type: String,
    trim: true,
    required: true,
    unique: true,
},
   email:{
    type:String,
    trim:true,
    required: true,
    unique:true,
},
profilepic:{
    type:String,
},

password:{
    type:String,
    trim:true,
    required: true
},
isAdmin:{
    type:Boolean,
    default: false
},



},{timestamps: true});

export default mongoose.model("user", userSchema)