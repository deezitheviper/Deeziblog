import React, { useContext, useEffect, useState } from 'react';
import { useParams,Link, useLocation } from 'react-router-dom';
import avatar from '../assets/img/avatar.png';
import instance from '../config/axios';
import { AuthContext } from '../context/authContext';
import Divider from '@mui/material/Divider';
import ProfilePagin from './ProfilePagination';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}
const Profile = () => {
    const query = useQuery();
    const page = Number(query.get('page')) || 1
    const [data, setData] = useState({
        posts:[],
        totalP: 1
    });
    const {posts, totalP} = data;
    const {currentUser} = useContext(AuthContext);
    const {authur} = useParams();
    const [loading, setLoading] = useState(false);




    useEffect(()=> {
        const fetchpost = async () => {
            setLoading(true)
        try{
            const res = await instance.get(`posts/userposts/${authur}/?page=${page}`)
            const {posts, totalP} = res.data
            setData(data => ({...data,posts:posts,totalP:totalP}))
        }catch(err){
            console.log(err)
        }
        setLoading(false)
    }
    fetchpost()
    },[page])
    return (
        <div className='profilePage'>
            <div className='profileP'>
                <div className='profile'>
                    <img className="pic" src={avatar} alt=""/>
                    <div className='info'>
                    <h3>{authur}</h3>
                    <p>Joined: 19th August</p>
                    </div>
                </div>

            </div>
            <div className='profile-blog'>
            <h3>Published Posts</h3>
            <Divider/> 
            <div className='blog-content'>
            {loading? 
                  <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
                :
                <>
            {posts?.map(post => (
                <div className='content' key={post._id}>
               
                <div className='l-content'>
                <div className='profile'> 
                {currentUser?.profilepic?
                        <img src={currentUser.profilepic} alt="account" />
                        :
                        <img src={avatar} alt="account" /> 
                }
    <div className='info'>
        <span>{post.authur}</span>    
     </div>
  </div>
  <Link to={`/${post.cat}/${post.slug}`}>
  <h3>{post.title}
  </h3>
  </Link>

  </div>
  <div className='r-content'>
  <img src={post?.img} alt=""/>
  </div>
  </div>
            ))}
            </>
}
            </div>
            <ProfilePagin data={{authur,data, totalP}} />
            </div>
        </div>
    );
};

export default Profile;