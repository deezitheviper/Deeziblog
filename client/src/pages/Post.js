import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../components/Sidebar';
import instance from '../config/axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext.js';
import avatar from '../assets/img/avatar.png';
import DOMPurify from "dompurify";
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Comment from './Comment';


const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const Post = () => {

const query = useQuery()
const page = Number(query.get('page')) || 1
const [data, setData] = useState({
    post:{},
    likes: [],
    totalP: 1,
    comments:[]
})
const {currentUser} = useContext(AuthContext)
const params = useParams();
const {slug} = params;
const [loading, setLoading] = useState(false)
const {post,totalP,comments,likes} = data;




{/*
const options = {
  method: 'GET',
  url: 'https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text',
};
*/}

const handleDelete = async () => {
   const res =  await instance.delete(`/posts/${slug}`)
   .catch(err => console.log(err))
}

const likePost = async () => {
    if(currentUser){
        const res = await instance.patch(`posts/like/${post._id}`)
        .catch(err => console.log(err))
        setData(e => ({...data, likes:res.data.data.likes}))
    }
}



useEffect(() => {

const getPost = async () => {
    setLoading(true)
    const res = await instance.get(`/posts/${slug}/?page=${page}`)
    .catch(err => console.log(err))
    setData(e => ({...data, post:res.data.data,comments:res.data.comments,likes:res.data.data.likes,totalP:res.data.totalPages }) )
    setLoading(false)
}

getPost()
}, [slug,page]);
    return (
        <div className='article'>
            
            {loading?
   <Box sx={{ display: 'flex' }}>
   <CircularProgress />
 </Box>
 :
            <>
             <div className='post-body'>
            
             <h1>{post?.title}</h1>
                <img src={post?.img} alt=""/>
             
                <div className='profile'>
               {currentUser?.profilepic?
               <img src='https://www.fillmurray.com/640/360' alt="account" />
               :
               <img src={avatar} alt="account" />
}
               <div className='info'>

                   <span>{post?.authur}</span>    
                   <p>Posted {moment(post?.date).fromNow()}</p>
                   
               </div> 
             {currentUser?.username === post?.authur && (
               <div className='edit'>
               <span className='editIcon'><Link to={'/create'} state={post}><CreateIcon/></Link></span>
               <span className='deleteIcon'><Link onClick={handleDelete}><DeleteIcon/></Link></span>
               </div>)}
           </div>
                <div className='post'>
                   
                <p dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.body)
          }} />   
                </div>
                <Divider  />
                <span >
                <Stack direction="row" alignItems="center" spacing={2}>
                <FavoriteBorderIcon onClick={likePost} className="i-like" fontSize='large'/>
                 <p>{likes.length}</p>
                </Stack>
                </span>
            
           Comments
   <Comment data={{post,comments,totalP,page}}/>
             </div>
           <div>
            <Sidebar post={post}/>
           </div>
           </>
}
        </div>
    );
};

export default Post;