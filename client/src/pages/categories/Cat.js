import React, { useEffect, useState } from 'react';
import {Link,useLocation, useParams} from "react-router-dom";
import instance from '../../config/axios.js';
import Pagin from '../Pagination.js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DOMPurify from "dompurify";

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}


const Cat = () => {
    const query = useQuery()
    const {cat} = useParams()
    const page = Number(query.get('page')) || 1
      const [data, setData] = useState({
        posts:[],
        totalPages:1,
    });
    const {posts, totalPages} = data;
    const [loading, setLoading] = useState(false)



    useEffect(()=> {
        const fetchArticle = async () => {
            setLoading(true)
            
                const res = await instance.get(`/posts/cat/${cat}?page=${page}`)
                .catch(err => console.log(err))
                const {posts, totalP} = res.data;
                setData(prev => ({...prev,posts:posts,totalPages:totalP}))
        
            setLoading(false)
        }
        
        fetchArticle();
    },[page,cat])


    return (
        <>
       
        <div className='home'>
            <div className='posts'>
                {loading? 
                  <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
                :
                <>
                {
                    posts?.map(post => (
                        <div className='post' key={post?._id}>
                            <div className='img'>
                            <img  src={post?.img} alt="" />
                            </div> 
                            <div className='content'>
                                <Link className="title" to={`/${post?.cat}/${post?.slug}`}>
                                <h1>{post?.title}</h1>
                                </Link>  
                                <p dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.body.slice(0, 400)+'...')
          }} />
                               <Link className='btn' to={`/post/${post?.slug}`}>Read more</Link>
                            </div>
                        </div>
                    ))
                   }</>
                }
            </div>       
        </div>
        
        <div className='pagn'>
        <Pagin data={{page,totalPages}}/>
        </div>
        </>
    );
};

export default Cat;