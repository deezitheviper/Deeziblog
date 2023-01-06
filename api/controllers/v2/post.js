
import db from '../'
import moment from 'moment';

export const getPost = async (req, res, next) => {

    const {page} = req.query
    const limit = 2;
    const startIndex = (Number(page)-1) * limit;
    const q = "SELECT `username`,`profilepic`, `title`, `desc`, `img`, `cat`, `date`, FROM `users` u JOIN posts p ON u.id === p.authur WHERE p.slug = ?"

    db.query(q,[req.params.id], (err, data) => {
        if(err) return next(err);
        return res.status(200).json({post:post,totalPages:Math.ceil(total/limit)})
    })
    try{
    const post = await Post.findOne({slug:req.params.id}).populate({path:'authur',select:['username','profilepic','_id']}).populate({path: 'comments',options: {
        $slice: [startIndex,limit]
     }, populate:{'path': 'authur',select:['username','profilepic','_id']}})
   
    const total = post.comments.length
    res.status(200).json({post:post,totalPages:Math.ceil(total/limit)})
    }catch(err){
        next(err)
    }
}


export const getPosts = async (req, res, next) => {
    const {page} = req.query
    const limit = 4;
    const startIndex = (Number(page)-1)*limit;
    const total = await Post.countDocuments({});
    const posts = await Post.find().sort({createdAt: 'desc'}).limit(limit).skip(startIndex)

    .catch(err => next(err))
    res.status(200).json({data:posts, currentPage:Number(page), totalPages: Math.ceil(total/limit)})
} 



export const getCatPost = async (req, res, next) => {
    const {page} = req.query
    try{
    const similarPosts = await Post.find({cat:req.params.cat}).sort({_id:-1}).populate({path:'authur',select:['username','profilepic','_id']})
    const limit = 2;
    const startIndex = (Number(page)-1)*limit
    const posts = await Post.find({cat:req.params.cat}).sort({_id:-1}).limit(limit).skip(startIndex).populate({path:'authur',select:['username','profilepic','_id']})
    //const total = posts.length
    //const totalP = Math.ceil(total/limit)
    res.status(200).json({similarPosts:similarPosts,posts:posts})
    }catch(err){
        next(err)
    }
} 

export const userPosts = async (req, res, next) => {
    
    const {page} = req.query
    const {id} = req.params
    const limit = 4;
    const startIndex = (Number(page)-1)*limit
    try{
    const total = await Post.find({authur:id}).countDocuments()
    const pagposts = await Post.find({authur:id}).sort({_id:-1}).limit(limit).skip(startIndex).populate({path:'authur',select:['username','profilepic','_id']})
    const totalP = Math.ceil(total/limit) 
    res.status(200).json({posts:pagposts,totalP:totalP})
    }catch(err){
        next(err)
    }
}
export const getSearchPost = async (req, res, next) => {
    const {searchQ} = req.query
    const title = new RegExp(searchQ, 'i')
    const posts = await Post.find({$or : [{title:title}]})
    .catch(err => next(err))
    res.status(200).json(posts)
}
 


export const createPost = async (req, res, next) => {
    const {title, img,slug,body,cat,authur} = req.body;
    const q = "INSERT INTO posts(`title`, `img`,`slug`,`body`,`cat`,`authur`,`date`) VALUES (?)"
    const values = [
        title,
        img,
        slug,
        body,
        cat,
        authur,
        moment(Date.now()).format('YYYY-MM-DD HH')
    ]

    db.query(q,[values],(err,data) => {
        if (err) return next(err);
        const {cat, slug} = data[0]
        return res.status(200).json({cat:cat, slug:slug})
    })
}

export const updatePost = async (req, res, next) => {

    const q = "UPDATE posts SET `title`=?, `body`=?, `img`=?, `cat`=?, `slug`=? WHERE id=?"
    const values = [
        title,
        body,
        img,
        cat,
        slug
    ]

    db.query(q,[...values, req.params.id], (err, data) => {
        if(err) return next(err);
        const {cat, slug} = data[0];
        return res.status(200).json({cat:cat, slug:slug})
    })
   
}

export const likePost = async (req, res, next) => {
    const {id} = req.params
   const userId = req.user.id
   try{
    const post = await Post.findById(id)
    const index = post.likes.findIndex((id) => id === String(userId));
    if(index ===  -1)
        post.likes.push(userId)
    else
        post.likes = post.likes.filter(id => id !== String(userId))

    const likedPost = await Post.findByIdAndUpdate(id, post, {new:true})
    res.json(likedPost.likes)
   }catch(err){
    next(err)
   }

}


export const deletePost = async (req, res, next) => {

    const q = "DELETE FROM posts WHERE `id` = ?"
    db.query(q,[req.params.id], (err,data) => {
        if(err) return next(err);
        return res.status(200).json("Post deleted")
    })


}


export const commentPost = async (req, res, next) => {
    const {id} = req.params
    try{ 
    const post = await Post.findById(id)
    const comment = new Comment(req.body)
    post.comments.push(comment)
    const updatedPost = await Post.findByIdAndUpdate(id, post, {new:true})
    await comment.save()
    const limit = 2
    const totalC = updatedPost.comments.length
    res.status(200).json({lastPage : Math.ceil(totalC/limit)})
    }catch(err){
        next(err)
    }
}

export const updateComment = async (req, res, next) => {
    const {postId,cId} = req.params
    const {body} = req.body
    const limit = 2;
    try{
    const post = await Post.findById(postId)
    const updatedPost = await Post.findOneAndUpdate({_id:postId,"comments._id":cId},{$set:{"comments.$.body":body}}, {new: true})
    const index = post.comments.findIndex(id => id.id == String(cId))
    const page = Math.ceil((index+1)/limit)
    res.status(200).json({page:page,msg:"Comment Updated"})
    }catch(err){
        next(err)
    }
} 

export const likeComment = async (req, res, next) => {
    const {postId, cId} = req.params
    const userId = req.user.id
try{
    const post = await Post.findById(postId)
    const comment = post.comments.findById(cId)
    const index = await comment.likes.filter(id => id !== String(userId))

    if(index === -1){
        comment.likes.push(userId)
    }
    else 
        comment.likes = await comment.likes.filter(id => id !== String(userId))

    await Post.findByIdAndUpdate(id, comment, {new: true})
}catch(err){
    next(err)
}

}

export const deleteComment = async (req, res, next) => {
    const {postId,cId} = req.params
    const post = await Post.findOneAndUpdate({_id:postId},{$pull:{comments:{_id:cId}}},{new:true})
    .catch(err => next(err))
    res.status(200).json("Comment Deleted")
}