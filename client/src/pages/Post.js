import React, { useEffect, useState, useContext, useRef } from 'react';
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
const update = query.get('update')
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
const csection = useRef(null);



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


const executeScroll = () => csection.current.scrollIntoView()
useEffect(() => {

const getPost = async () => {
    setLoading(true)
    const res = await instance.get(`/posts/${slug}/?page=${page}`)
    .catch(err => console.log(err))
    const {post,likes,comments,totalPages} = res.data
    setData(e => ({...data, post:post,comments:comments,likes:likes,totalP:totalPages }) )
    setLoading(false)

}
getPost()
if(update) {
    return executeScroll()
}

}, [slug,page,update]);
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

                   <span><Link to={`/Profile/${post?.authur}`}>{post?.authur}</Link></span>    
                   <p>Posted {moment(post?.date).fromNow()}</p>
                   
               </div> 
             {currentUser?.username === post?.authur && (
               <div className='edit'>
               <span className='editIcon'><Link to={'/create'} state={post}><CreateIcon/></Link></span>
               <span className='deleteIcon'><DeleteIcon onClick={handleDelete}/></span>
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
           <div ref={csection}>
   <Comment data={{post,comments,totalP,page}}/>
   </div>
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