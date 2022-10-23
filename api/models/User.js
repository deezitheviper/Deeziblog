import mongoose from 'mongoose';
const { Schema } = mongoose;

function toLower (str) {
    return str.toLowerCase();
}

const userSchema = new Schema({
  username:{
    type: String,
    trim: true,
    required: true,
    unique: true,
    set: toLower,
},
   email:{
    type:String,
    trim:true,
    required: true,
    unique:true,
    set: toLower,
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