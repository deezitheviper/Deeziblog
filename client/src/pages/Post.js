import React, { useEffect, useState, useLocation, useContext } from 'react';
import { Link } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../components/Sidebar';
import instance from '../config/axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext.js';


const Post = () => {
   
const [post, setPost] = useState()
const {currentUser} = useContext(AuthContext)
const location = useLocation()
const postId = location.pathname.split("/")[2]
const options = {
  method: 'GET',
  url: 'https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text',
};

const handleDelete = async () => {
   const res =  await instance.delete(`/posts/${postId}`)
   .catch(err => console.log(err))
   console.log(res)
}

useEffect(() => {
    const fetchApi = () => {
    instance.request(options).then(res => {
        setPost(res.data)
    }).catch(err  => {
        console(err);
    });
}
const getPost = async () => {
    const res = await instance.get('/posts', {id:postId})
    .catch(err => console.log(err))
    setPost(res.data)
}

fetchApi()
}, []);
    return (
        <div className='article'>
            
             <div className='post-body'>
           
             <h1>{post?.slice(0,70)}</h1>
                <img src={post?.img} alt=""/>
             
                <div className='profile'>
               
               <img src='https://www.fillmurray.com/640/360' alt="account" />
               <div className='info'>

                   <span>{post?.author}</span>    
                   <p>Posted {moment(post?.date).fromNow()}</p>
                   
               </div> 
             {currentUser.username === post.username && (
               <div className='edit'>
               <span className='editIcon'><Link to={'/edit'}><CreateIcon/></Link></span>
               <span className='deleteIcon'><Link onClick={handleDelete}><DeleteIcon/></Link></span>
               </div>)}
           </div>
                <div className='post'>
                   
                   {post.body}
                </div>
             </div>
           <div>
            <Sidebar cat={post.cat}/>
           </div>
        </div>
    );
};

export default Post;