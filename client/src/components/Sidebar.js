import React,{useState, useEffect, useContext} from 'react';
import instance from '../config/axios.js';
import avatar from '../assets/img/avatar.png';
import { AuthContext } from '../context/authContext.js';
import { Link } from 'react-router-dom';

const Sidebar = ({post}) => {
    const [posts, setPosts] = useState()
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {

        const getCatPost = async () => {
        const res = await instance.get(`/posts/${post.cat}/${post._id}`)
        .catch(err => console.log(err.response.data))
        console.log(res.data)
        if(res.data[0].body)
            setPosts(res.data)
        }
        getCatPost();
    },[post.cat])

    return (
        <div >
            
            <div className='sidebar'>
            <h3>Similar Articles</h3>
            {console.log(posts)}
            {posts?.map(post => (
 <div className='content' key={post.id}>
 <div className='l-content'>
  <div className='profile'> 
  {currentUser?.profilepic?
               <img src='https://www.fillmurray.com/640/360' alt="account" />
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
  <img src={`../upload/${post?.img}`} alt=""/>
  </div>
  </div>
            ))}
           
             </div>
        </div>
    );
};

export default Sidebar;