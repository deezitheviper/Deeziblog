import React,{useState, useEffect} from 'react';
import instance from '../config/axios.js';



const Sidebar = ({cat}) => {
    const [posts, setPosts] = useState()

    useEffect(() => {
        const getCatPost = async () => {
        const res = await instance.get(`/posts/?cat=${cat}`)
        .catch(err => console.log(err))
        setPosts(res.data)
       
        }
        getCatPost();
    },[cat])

    return (
        <div >
            
            <div className='sidebar'>
            <h3>More from Deeziblog</h3>
            {posts?.map(post => (
 <div className='content'>
 <div className='l-content'>
  <div className='profile'>
    <img src='https://www.fillmurray.com/640/360' alt="account" />
    <div className='info'>
        <span>{post.authur}</span>    
     </div>
  </div>
  <h3>{post.title}
  </h3>

  </div>
  <div className='r-content'>
  <img src={`../public/upload/${post.img}`} alt=""/>
  </div>
  </div>
            ))}
           
             </div>
        </div>
    );
};

export default Sidebar;