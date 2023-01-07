import express  from "express";
import { getPost,getPosts,updatePost, deletePost, createPost, userPosts} from "../../controllers/v2/post.js";
import { verifyToken, verifyUser } from "../../middleware/verify.js";




const router = express.Router()

//
router.get('/', getPosts)
//router.get('/search', getSearchPost)
router.get('/:id',getPost)
//router.get('/userposts/:id', userPosts)
//router.get('/cat/:cat', getCatPost)
router.post('/createPost', verifyUser, createPost) 
//router.post('/comment/:id', verifyUser, commentPost) 
router.put('/:slug',verifyUser,updatePost)
//router.patch('/like/:id',verifyToken,likePost)
//router.patch('/updateC/:postId/:cId',verifyUser, updateComment)
router.delete('/:id',verifyUser, deletePost)
//router.delete('/deleteC/:postId/:cId',verifyUser, deleteComment)


export default router