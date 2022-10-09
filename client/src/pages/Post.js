import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Sidebar from '../components/Sidebar';


const Post = () => {
   
const [content, setContent] = useState()
const options = {
  method: 'GET',
  url: 'https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text',
};



useEffect(() => {
    axios.request(options).then(res => {
        setContent(res.data)
    }).catch(err  => {
        console(err);
    });
}, [])
    return (
        <div className='article'>
            
             <div className='content-body'>
           
             <h1>{content?.slice(0,70)}</h1>
                <img src="https://placebeard.it/640x360" alt=""/>
             
                <div className='profile'>
               
               <img src='https://www.fillmurray.com/640/360' alt="account" />
               <div className='info'>

                   <span>John</span>    
                   <p>Posted 2 days ago</p>
                   
               </div> 
            
               <div className='edit'>
               <span className='editIcon'><Link to={'/edit'}><CreateIcon/></Link></span>
               <span className='deleteIcon'><Link to={'/delete'}><DeleteIcon/></Link></span>
               </div>
           </div>
                <div className='content'>
                   
                   {content}
                </div>
             </div>
           <div>
            <Sidebar/>
           </div>
        </div>
    );
};

export default Post;