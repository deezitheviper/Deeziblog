import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({

    title:  {
        type:String,
        required: true,
        unique: true
    },
    author: {
        type:String,
        required: true,
        unique: true
    },
    cat: {
        type:String,
        required: true,
        unique: true
    },
    body: {
        type:String,
        required: true,
        unique: true
    },
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now, required:true },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
},{timestamps: true});

export default mongoose.model("post", postSchema)