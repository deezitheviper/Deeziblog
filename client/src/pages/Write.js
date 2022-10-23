import { TableBody } from '@mui/material';
import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../config/axios.js';
import {toast } from 'react-toastify';
import { AuthContext } from '../context/authContext.js';

const Create = () => {
    const state = useLocation().state
    const [err, setErr] = useState({})
    const {currentUser} = useContext(AuthContext)
    const [content, setContent] = useState( state?.body || "")

    const navigate = useNavigate();

    const slugify = str =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

    const [inputs , setInput] = useState({
        title: state?.title || "",
        cat: state?.cat ||  "",
        img: state?.img || "",
    })

    const checkForm = () => {
        let err = {}
        let formIsValid = true

        if(!inputs.title){
            formIsValid = false;
            err["title"] = "Title is required"  
        }

        if(!content){
            formIsValid = false;
            err["content"] = "Content is required"  
        }
        if(!inputs.img){
            formIsValid = false;
            err["img"] = "Image is required"  
        }
        if(!inputs.cat){
            formIsValid = false;
            err["cat"] = "Category is required"  
        }

        setErr(err)
        return formIsValid
        
    }

    const upload = async () => {
        const formData = new FormData();
        formData.append('img', inputs.img)
        const res =  await instance.post('/upload',formData)
        .catch(err => console.log(err.response.data))
        return res.data
    }
    const handleChange = e => {
        setInput(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handlePublish = async (e) => {
        e.preventDefault()
        if(checkForm()){
      
        if (state){
            const res = await instance.put(`/posts/${state.slug}`,{...inputs,
                body:content,
                img: inputs.img,
                slug:slugify(inputs.title)})
            .catch(err => console.log(err.response.data)) 
           
        }
        else{
           const imgurl = await upload()
           .catch(err => console.log(err))
           const res = await instance.post('/posts/createPost',{...inputs,
            body:content,
            authur: currentUser.username,
            img:imgurl,
            slug:slugify(inputs.title)
        })
            .catch(err => console.log(err.response.data)) 
    }
    navigate('/')
}else{
    checkForm()
}
}

  


    return (
        <div className='create'>
             <div className='content'>
             
             {err["title"] && <p className='danger'>{err["title"]}</p>}
                <input type="text" defaultValue={inputs.title} placeholder='Title' name="title" onChange={handleChange} />
                {err["content"] && <p className='danger'>{err["content"]}</p>}
                <div className='editorContainer'>
                
                    <ReactQuill  className="editor" theme="snow" value={content} onChange={setContent}/>
                </div>
             </div>
             <div className='sidebar'>
                <div className='item'>
                    <h1>Publish</h1>
                    <br/>
                    <span><b>Status :</b> Draft</span>
                    <span><b>Visibility :</b> Public</span>
                   <br/>
                    <label>Upload Image</label>
                 <br/>
                    <input  onChange={e => setInput(prev => ({...prev, img:e.target.files[0]}))} type="file"/>
                    <br/>
                    {err["img"] && <p className='danger'>{err["img"]}</p>}
                    <br/>

                    <div className='buttons'>
                        <button >Save as Draft</button>
                        <button onClick={handlePublish}>Publish</button>
                    </div>
                </div>
                <div className='item'>
                
                    {err["cat"] &&<><p className='danger'>{err["cat"]}</p><br/></>}
                    
                    <h1>Category</h1>
                    <div className='cat'>
                    <input type="radio" name="cat" checked={inputs.cat === "Javascript"}  value="Javascript" onChange={handleChange}/>
                    <label htmlFor='radio'>Javascript</label>
                    </div>
                    <div className='cat'>
                    <input type="radio" name="cat" checked={inputs.cat === "Python"} value="Python" onChange={handleChange}/>
                    <label htmlFor="Python">Python</label>
                    </div>
                    <div className='cat'>
                    <input type="radio" name="cat" checked={inputs.cat === "Offensive Security"} value="Offensive Security" onChange={handleChange}/>
                    <label htmlFor="Offensive Security">Offensive Security</label>
                    </div>
                    <div className='cat'>
                    <input type="radio" name="cat" checked={inputs.cat === "Machine Learning"} value="Machine Learning" onChange={handleChange}/>
                    <label htmlFor="Machine Learning">Machine Learning</label>
                    </div>
                </div>
             </div>
        </div>
    );
};

export default Create;