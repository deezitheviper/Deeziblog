import React,{useState, useEffect, useContext} from 'react';
import instance from '../config/axios.js';
import avatar from '../assets/img/avatar.png';
import { AuthContext } from '../context/authContext.js';


const Sidebar = ({cat}) => {
    const [posts, setPosts] = useState()
    const {currentUser} = useContext(AuthContext)

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
  <h3>{post.title}
  </h3>

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