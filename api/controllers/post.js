import Post from '../models/Post.js';

export const getPosts = async (req, res, next) => {
    const posts = await Post.find()
    .catch(err => next(err))
    res.status(200).json(posts)
} 


export const getCatPost = async (req, res, next) => {
    const posts = await Post.find({cat:req.params.cat})
    .catch(err => next(err))
    res.status(200).json(posts)
} 

export const getPost = async (req, res, next) => {
    const post = await Post.find({slug:req.params.id})
    .catch(err => next(err))
    res.status(200).json(post)
}

export const createPost = async (req, res, next) => {
    console.log(req.body)
    const post = new Post(req.body)
    const savedPost =  await post.save()
    .catch(err => next(err))
    res.status(200).json(savedPost)
}

export const updatePost = async (req, res, next) => {
    const updatedPost =  await Post.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{
        new:true
    }).catch(err => next(err))
    res.status(200).json("Post has been updated")
}

export const deletePost = async (req, res, next) => {
    const deletedPost = await Post.findOneAndDelete(req.params.id)
    .catch(err => next(err))
    res.status(200).json(deletedPost)
}