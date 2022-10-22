import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({

    title:  {
        type:String,
        required: true,
        unique: true
    },
    authur: {
        type:String,
        required: true,
    },
    img:{
        type:String,
    },
    cat: {
        type:String,
        required: true,
    },
    body: {
        type:String,
        required: true,
    },
    slug:{
        type:String,
        required: true,
        unique: true
    },
    likes:{
        type: Number,
        default: 0
    },
    comments: [
        { body: String,
         date: Date ,
        likes: Number
        }],
    date: { type: Date, default: Date.now, required:true },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
},{timestamps: true});

export default mongoose.model("post", postSchema)