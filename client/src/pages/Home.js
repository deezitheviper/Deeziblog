import React, { useEffect, useState } from 'react';
import {Link, useLocation} from "react-router-dom";
import instance from '../config/axios.js';

const Home = () => {
    const [posts, setPosts] = useState();
    const slugify = str =>
    str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    useEffect(()=> {
        const fetchPost = async () => {
            const res = await instance.get('/posts')
            .catch(err => console.log(err))
            setPosts(res.data)
        }
        fetchPost();
    },[])

    return (
        <div className='home'>
            <div className='posts'>

                {
                   
                    posts?.map(post => (
                        <div className='post' key={post?.id}>
                            <div className='img'>
                            <img  src={`../upload/${post?.img}`} alt="" />
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
             
        </div>
    );
};

export default Home;