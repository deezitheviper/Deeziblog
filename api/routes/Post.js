import express  from "express";
import { getPost,getPosts,updatePost, deletePost, createPost,getCatPost } from "../controllers/post.js";

const router = express.Router()

//
router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/cat/:id', getCatPost)
router.post('/createPost', createPost) 
router.put('/:id', updatePost)
router.delete('/:id', deletePost)


export default router