import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import instance from '../config/axios.js';
import Pagin from './Pagination.js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



const Home = () => {
    const [data, setData] = useState({
        posts:[],
        totalPages:1,
        page:1
    });

    const {posts, totalPages, page} = data;

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    const [loading, setLoading] = useState(false)


    useEffect(()=> {
        const fetchPost = async () => {
            const res = await instance.get('/posts')
            .catch(err => console.log(err))
            setData(prev => ({...prev,posts:res.data.data,totalPages:res.data.totalPages}))
        }
        fetchPost();
    },[])

    return (
        <>
        <div className='home'>
        {loading? 
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
                :
            <div className='posts'>
                {        
                    posts?.map(post => (
                        <div className='post' key={post?._id}>
                            <div className='img'>
                            <img  src={`${post?.img}`} alt=" " />
                            </div> 
                            <div className='content'>
                                <Link className="title" to={`/${post?.cat}/${post?.slug}`}>
                                <h1>{post?.title}</h1>
                                </Link>  
                                <p>{`${getText(post?.body).slice(0, 400)}...`}</p>   
                               <Link className='btn' to={`/post/${post?.slug}`}>Read more</Link>
                            </div>
                        </div>
                    ))
                   }
            </div>
}
        </div>
                
       <div className='pagn'>
        <Pagin data={{page,totalPages}}/>
        </div>
        </>
    );
};

export default Home;