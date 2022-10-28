import React, {useState,useContext} from 'react';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import avatar from '../assets/img/avatar.png';
import instance from '../config/axios';
import { AuthContext } from '../context/authContext.js';
import moment from 'moment';

const Comment = ({data}) => {

    const [value, setValue] = useState('');
    const [comments, setComments] = useState(data?.comments)
    const {currentUser} = useContext(AuthContext)
    const handleChange = e => {
    setValue(e.target.value)
    };


    const postComment = async () => {
        if(currentUser){
            const res = await instance.post(`posts/comment/${data._id}`,{
                authur:currentUser.username,
                body:value
            })
            .catch(err => console.log(err))
            console.log(res)
        }
    }
    return (
        <div>
               <div className='c-section'>
        {comments?.map(comment => (
  <div className='comment' key={comment._id}>
  <div className='profile'> 
  {currentUser?.profilepic?
               <img src={`${currentUser?.profilepic}`} alt="account" />
               :
               <img src={avatar} alt="account" /> 
  }
    <div className='info'>
        <span>{comment.authur}</span>    
        
     </div>
  </div>
  <p className='c-content'>
  {comment.body}
   </p>
  <Divider>
    <Chip label={`${ `${moment(comment?.date).fromNow()}`}`} />
  </Divider>
  </div>
    ))}        

           <div className='publish-c'>
             <TextField
          id="outlined-multiline-flexible"
          label="Comment"
          multiline
          sx={{ m: 1, width: '35ch' }}
          value={value}
          onChange={handleChange}
        />
        <button onClick={postComment}> Comment </button>
             </div>
            
             </div> 
        </div>
    );
};

export default Comment;