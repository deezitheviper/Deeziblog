import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../components/Sidebar';
import instance from '../config/axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext.js';
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
    totalP: 1,
    comments:[],
})

const [likes, setLikes] = useState([]);
const {currentUser} = useContext(AuthContext)
const params = useParams();
const {slug} = params;
const [loading, setLoading] = useState(false)
const [liking, setLiking] = useState(false)
const {post,totalP} = data;
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
        setLiking(true);
        try{
        const res = await instance.patch(`posts/like/${post._id}`)
        setLikes(res.data)
        setLiking(false);
        }catch(err){
        console.log(err)
        setLiking(false);
        }
       
    }
}


const executeScroll = () => csection.current.scrollIntoView()
useEffect(() => {

const getPost = async () => {
    setLoading(true)
    const res = await instance.get(`/posts/${slug}/?page=${page}`)
    .catch(err => console.log(err))
    const {post,totalPages} = res.data
    setData(e => ({...data, post:post,comments:post.comments,totalP:totalPages }))
    setLikes(post.likes)
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
   <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center' }}>
   <CircularProgress />
 </Box>
 :
            <>
             <div className='post-body'>
            
             <h1>{post?.title}</h1>
                <img src={post?.img} alt=""/>
             
                <div className='profile'>
            
            
               <img src={post?.authur?.profilepic} alt="account" />

               <div className='info'>

                   <span><Link to={`/Profile/${post?.authur?.username}`}>{post?.authur?.username}</Link></span>    
                   <p>Posted {moment(post?.date).fromNow()}</p>
                   
               </div> 
             {currentUser?.username === post?.authur?.username && (
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
                                
            {liking?
   <Box sx={{ display: 'flex' }}>
   <CircularProgress />
 </Box>
 :
 <>
                <FavoriteBorderIcon onClick={likePost} className="i-like" fontSize='large' style={{cursor:'pointer'}}/>
                 <p>{likes?.length}</p>
                 </>
            }
                </Stack>
                </span>
            
           Comments
           <div ref={csection}>
           
   <Comment data={data} page={page}/>
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