import { TableBody } from '@mui/material';
import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import { useLocation } from 'react-router-dom';
import instance from '../config/axios.js'
import { AuthContext } from '../context/authContext.js';

const Create = () => {
    const state = useLocation().state
    const {currentUser} = useContext(AuthContext)
    const [content, setContent] = useState( state?.content || "")
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
        img: state?.img || null,
    })

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
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
        const imgurl = await upload()
        .catch(err => console.log(err))
        if (state){
            await instance.put(`/posts/${state.id}`)
            .catch(err => console.log(err.response.data)) 
        }
        else{
           const res = await instance.post('/posts/createPost',{...inputs,
            body:getText(content),
            authur: currentUser.username,
            img:imgurl,
            slug:slugify(inputs.title)
        })
            .catch(err => console.log(err.response.data)) 
            console.log(res.data)
    }
}

  


    return (
        <div className='create'>
             <div className='content'>
                <input type="text" defaultValue={inputs.title} placeholder='Title' name="title" onChange={handleChange} />
                <div className='editorContainer'>
                    <ReactQuill  className="editor" theme="snow" value={getText(content)} onChange={setContent}/>
                </div>
             </div>
             <div className='sidebar'>
                <div className='item'>
                    <h1>Publish</h1>
                    <span><b>Status :</b> Draft</span>
                    <span><b>Visibility :</b> Public</span>
                   
                    <label>Upload Image</label>
                    <input  onChange={e => setInput(prev => ({...prev, img:e.target.files[0]}))} type="file"/>
                    <br/>
                    <div className='buttons'>
                        <button >Save as Draft</button>
                        <button onClick={handlePublish}>Publish</button>
                    </div>
                </div>
                <div className='item'>
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