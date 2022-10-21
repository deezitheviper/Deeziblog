import express  from "express";
import { getPost,getPosts,updatePost, deletePost, createPost,getCatPost, getSearchPost } from "../controllers/post.js";

const router = express.Router()

//
router.get('/', getPosts)
router.get('/search', getSearchPost)
router.get('/:id', getPost)
router.get('/:cat/:id', getCatPost)
router.post('/createPost', createPost) 
router.put('/:slug', updatePost)
router.delete('/:id', deletePost)


export default router