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
    const {page} = req.query
    const similarPosts = await Post.find({cat:req.params.cat}).sort({_id:-1})
    const limit = 2;
    const startIndex = (Number(page)-1)*limit
    const posts = await Post.find({cat:req.params.cat}).sort({_id:-1}).limit(2).skip(startIndex)
    .catch(err => next(err))
    const total = posts.length
    const totalP = Math.ceil(total/limit)
    res.status(200).json({posts:posts,similarPosts:similarPosts,total:totalP})
} 
export const getSearchPost = async (req, res, next) => {
    const {searchQ} = req.query
    const title = new RegExp(searchQ, 'i')
    const posts = await Post.find({$or : [{title:title}]})
    .catch(err => next(err))
    res.status(200).json(posts)
}

export const getPost = async (req, res, next) => {
    const {page} = req.query
    const post = await Post.findOne({slug:req.params.id})
    .catch(err => next(err))
    const limit = 2;
    const startIndex = (Number(page)-1) * limit;
    const total = await post.comments.length
    const postC = await Post.findOne({slug:req.params.id}, {comments:{$slice:[startIndex,limit]}})
    const comments = postC.comments
    res.status(200).json({post:post,likes:post.likes,comments:comments,totalPages:Math.ceil(total/limit)})

}

export const createPost = async (req, res, next) => {
    const post = new Post(req.body)
    const savedPost =  await post.save()
    .catch(err => next(err))
    const {cat, slug} = savedPost
    res.status(200).json({cat:cat, slug:slug})
}

export const updatePost = async (req, res, next) => {
    const updatedPost =  await Post.findOneAndUpdate({slug:req.params.slug},{
        $set:req.body
    },{
        new:true
    }).catch(err => res.status(500).json(err))
    const {cat, slug} = updatedPost
    res.status(200).json({cat:cat, slug:slug})
}

export const likePost = async (req, res, next) => {
    const {id} = req.params
   const userId = req.user.id
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Post not found")
    const post = await Post.findById(id)
    const index = post.likes.findIndex((id) => id === String(userId));
    if(index ===  -1)
        post.likes.push(userId)
    else
        post.likes = post.likes.filter(id => id !== String(userId))

    const likedPost = await Post.findByIdAndUpdate(id, post, {new:true})
    res.json({likes:likedPost.likes})

}


export const deletePost = async (req, res, next) => {
    await Post.findOneAndDelete(req.params.id)
    .catch(err => next(err))
    res.status(200).json("Post deleted")
}


export const commentPost = async (req, res, next) => {
    const {id} = req.params

    const post = await Post.findById(id)

    post.comments.push({...req.body})
    const updatedPost = await Post.findByIdAndUpdate(id, post, {new:true})
    .catch(err => next(err))
    const limit = 2
    const totalC = updatedPost.comments.length
    res.status(200).json({lastPage : Math.ceil(totalC/limit)})
}

export const updateComment = async (req, res, next) => {
    const {postId,cId} = req.params
    const {body} = req.body
    const limit = 2
    const post = await Post.findById(postId)
    .catch(err => next(err))
    const updatedPost = await Post.findOneAndUpdate({_id:postId,"comments._id":cId},{$set:{"comments.$.body":body}}, {new: true})
    .catch(err => next(err))
    const index = post.comments.findIndex(id => id.id == String(cId))
    const page = Math.ceil((index+1)/limit)
    console.log(updatedPost.comments,req.body)
    res.status(200).json({page:page,msg:"Comment Updated"})
} 

export const likeComment = async (req, res, next) => {
    const {postId, cId} = req.params
    const userId = req.user.id

    const post = await Post.findById(postId)
    const comment = post.comments.findById(cId)
    const index = await comment.likes.filter(id => id !== String(userId))

    if(index === -1){
        comment.likes.push(userId)
    }
    else 
        comment.likes = await comment.likes.filter(id => id !== String(userId))

    await Post.findByIdAndUpdate(id, comment, {new: true})

}

export const deleteComment = async (req, res, next) => {
    const {postId,cId} = req.params
    const post = await Post.findOneAndUpdate({_id:postId},{$pull:{comments:{_id:cId}}},{new:true})
    .catch(err => next(err))
    console.log(post)
    res.status(200).json("Comment Deleted")
}