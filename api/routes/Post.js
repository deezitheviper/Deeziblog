import express  from "express";
import { getPost,getPosts,updatePost, deletePost, createPost,getCatPost, getSearchPost, likePost} from "../controllers/post.js";
import { verifyToken, verifyUser } from "../middleware/verify.js";



const router = express.Router()

//
router.get('/', getPosts)
router.get('/search', getSearchPost)
router.get('/:id',getPost)
router.get('/:cat/:id', getCatPost)
router.post('/createPost', verifyUser, createPost) 
router.patch('/:slug',verifyUser,updatePost)
router.patch('/like/:id',verifyToken,likePost)
router.delete('/:id',verifyUser, deletePost)


export default router