import mongoose from 'mongoose';
import Post from '../models/Post.js';

export const getPosts = async (req, res, next) => {
    const {page} = req.query
    const limit = 2;
    const startIndex = (Number(page)-1)*limit;
    const total = await Post.countDocuments({});
    const posts = await Post.find().sort({createdAt: 'desc'}).limit(limit).skip(startIndex)

    .catch(err => next(err))
    res.status(200).json({data:posts, currentPage:Number(page), totalPages: Math.ceil(total/limit)})
} 


export const getCatPost = async (req, res, next) => {
    const posts = await Post.find({_id:{$ne:`${req.params.id}`}},{cat:req.params.cat})
    .catch(err => next(err))
    console.log(posts)
    res.status(200).json(posts)
} 
export const getSearchPost = async (req, res, next) => {
    const {searchQ} = req.query
    const title = new RegExp(searchQ, 'i')
    const posts = await Post.find({$or : [{title:title}]})
    .catch(err => next(err))
    console.log(posts)
    res.status(200).json(posts)
}

export const getPost = async (req, res, next) => {
    const post = await Post.find({slug:req.params.id})
    .catch(err => next(err))
    res.status(200).json(post)
}

export const createPost = async (req, res, next) => {
    const post = new Post(req.body)
    const savedPost =  await post.save()
    .catch(err => next(err))
    res.status(200).json(savedPost)
}

export const updatePost = async (req, res, next) => {
    const updatedPost =  await Post.findOneAndUpdate({slug:req.params.slug},{
        $set:req.body
    },{
        new:true
    }).catch(err => res.status(500).json(err))
    console.log(updatePost)
    res.status(200).json(updatedPost)
}

export const likePost = async (req, res, next) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Post not found")
    const post = await Post.findById(id)
    const likedPost = await Post.findByIdAndUpdate(id, {likes: post.likes + 1  }, {new:true})
    res.json(likedPost)

}

export const unlikePost = async (req, res, next) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Post not found")
    const post = await Post.findById(id)
    const unlikedPost = await Post.findByIdAndUpdate(id, {likes: post.likes - 1  }, {new:true})
    res.json(unlikedPost)
    
}

export const deletePost = async (req, res, next) => {
    const deletedPost = await Post.findOneAndDelete(req.params.id)
    .catch(err => next(err))
    res.status(200).json(deletedPost)
}
