import React, { useContext, useEffect, useState } from 'react';
import { useParams,Link, useLocation } from 'react-router-dom';
import avatar from '../assets/img/avatar.png';
import instance from '../config/axios';
import { AuthContext } from '../context/authContext';
import Divider from '@mui/material/Divider';
import ProfilePagin from './ProfilePagination';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import moment from "moment";
import CreateIcon from '@mui/icons-material/Create';
import EditProfile from './EditProfile';
import FileBase from 'react-file-base64';
import {toast} from "react-toastify";


const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}
const Profile = () => {
    const query = useQuery();
    const page = Number(query.get('page')) || 1
   
    const [data, setData] = useState({
        posts:[],
        totalP: 1,
        joined:"",
        username:"",
        email:"",
        profilepic:""
    });
    const {posts,email, username,joined, totalP, profilepic} = data;
    const {currentUser} = useContext(AuthContext);
    const {_id} = currentUser;
    const {authur} = useParams();
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [file, setFile] = useState("");
    const [update, setUpdate] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const [inputs, setInputs] = useState({
        useremail:"",
        img:"",
        password: "",
        confirmpassword: ""
    })
    const [err, setErr] = useState({})
    const {password,confirmpassword, img, useremail} = inputs;

    const checkImage = (file) => {
        const types = ['image/png', 'image/jpeg']
        let err = null;
        if(!file) return err = "File does not exist."
      
        if(file.file.size > 1024 * 1024) // 1mb
          err = "The largest image size is 1mb"
      
        if(!types.includes(file.type))
          err = "The image type is png / jpeg"

        if(!err) {
            setFile(file)
            setUpdate(true)
        }
        return  toast.error(err);
    }  

    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
       
    }

  const regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
  const checkForm = () => {
    let err = {};
    let valid = true
    if(useremail){
        if(!regEmail.test(useremail)){
            err["email"] = "Input a valid email address"
            valid = false
        }
}
    if(useremail === email){
        setInputs(prev => ({...prev,useremail:""}))
    }

   
    setErr(err)
    if(!err){
        setUpdate(true)
    }
    return valid

  }

    const checkPass = e => {
        let err= {}
        let valid = true
        if(password !== confirmpassword){
            err['pass']= 'Password don\'t match'
            valid = false
        }
        setErr(err)
        if(!err){
            setUpdate(true)
        }
        return valid;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        if(update === false) return toast.info("No changes has been made")
        if(file){
            setInputs(prev => ({...prev,img:file.base64}))
        }
        setUpdateLoading(true)
        if(img || useremail){
            
            if(checkForm() == true){
                
                try{
            const res = await instance.patch(`user/${username}`,{avatar:img,email})
           toast.success(res.data)
           setUpdate(false)
           setEdit(false)
           
                }catch(err) {
                     console.log(err)
                }
        }
        }
        if(password){
            if(checkPass() == true){
                
        try{
            const res = await instance.patch(`user/resetpass/${_id}`,{password})
            toast.success(res.data)
            setUpdate(false)
            setEdit(false)
            
        }catch(err) { console.log(err)}
           
            }
        }
       
        setUpdateLoading(false)
    }
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

    const getUser = async () => {
        const res = await instance.get(`user/${authur}`)
        const {username, email,createdAt, profilepic} = res.data;
        setData(prev => ({...prev, username:username,email:email,profilepic:profilepic, joined:createdAt}))
    }
    getUser()
    fetchpost()
    },[page])
    return (
        <div className='profilePage'>
            <div className='profileP'>
         <Divider/>
                <>
                <div className='profile'>
                    <div className='img-con'>
                    
                    <img className="pic" src={file?file.base64:profilepic} alt=""/>
                    {currentUser?.username === authur & edit?
                    <label >
                         <CreateIcon className='edit-icon'/>
                        <FileBase
                        type="file"
                        multiple={false}
                        onDone={file => checkImage(file) //setInput({ ...inputs, img: base64 })
        }
      />
                   
                    </label>
                    : null
                    }
                    </div>
                    <div className='info'>
                    <h3>{authur}</h3>
                    <p>Joined: <small>{moment(joined).format("MMMM Do YYYY")}</small></p>
{currentUser.username === authur &&(
    <div className='user-detail'>
                    <p>Email: <small>{currentUser.email}</small></p>
{edit?
    <button className="edit-btn" onClick={() => setEdit(false)}>Back</button>
    :
                    <button className="edit-btn" onClick={() => setEdit(true)}>Edit Profile</button>
}
                    </div>
) }
                    
                    </div>
                </div>
                </>

            </div>
            {edit? 
 <div div className='profile-blog'>
 <div className='blog-content edit-profile'>
 <form>
     <div className='username'>
     <label>Username: </label><input type="text" value={username} disabled />
     </div>
     <div className='email'>
     {err["email"] && <small className='danger'>{err["email"]}</small>}<br/>
     <label>Email: </label> <input name="useremail"  type="email" onChange={handleChange} onBlur={checkForm} defaultValue={email} />
     </div>
    <Divider/>
     <p>New Password</p>
     {err["pass"] && <small className='danger'>{err["pass"]}</small>}
     <input type="password" placeholder="Password" onChange={handleChange} name="password" />
     <input type="password" placeholder="Confirm Password" onChange={handleChange} onBlur={checkPass} name="confirmpassword" />
     <div>
        
     {updateLoading? 
                  <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
                :
     <button onClick={handleSubmit}  >Update Profile</button> 
}
     </div>
     </form>
     
 </div>
</div>
            :
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
}
        </div>
    );
};

export default Profile;