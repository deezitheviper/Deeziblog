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
        const res = await instance.get(`/posts/cat/${post.cat}`)
        .catch(err => console.log(err.response.data))
        setPosts(res.data)
        }
        getCatPost();
    },[post.cat])

    const similarPosts = posts?.filter(({_id}) => _id !== post._id);

    return (
        <div >
            
            <div className='sidebar'>
            <h3>Similar Articles</h3>
            {similarPosts?.map(post => (
 <div className='content' key={post._id}>
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
  <img src={post?.img} alt=""/>
  </div>
  </div>
            ))}
           
             </div>
        </div>
    );
};

export default Sidebar;