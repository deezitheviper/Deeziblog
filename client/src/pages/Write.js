
import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../config/axios.js';
import FileBase from 'react-file-base64';
import { AuthContext } from '../context/authContext.js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {toast} from 'react-toastify';

const Create = () => {
    const state = useLocation().state
    const [err, setErr] = useState({})
    const {currentUser} = useContext(AuthContext)
    const [loading, setLoading] = useState()
    const [content, setContent] = useState( state?.body || "")
    const [file, setFile] = useState()
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
        formData.append('title', inputs.title)
        formData.append('body', inputs.body)
        formData.append('cat', inputs.cat)
        formData.append('authur', currentUser._id)
        formData.append('slug', slugify(inputs.title))
        formData.append('img', inputs.img)
        try {
        const res =  await instance.post('/upload',formData)
        console.log(res)
        }catch(err){
            console.log(err.response.data)
        }
    }
    const handleChange = e => {
        setInput(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const checkImage = (file) => {
        
        const types = ['image/png', 'image/jpeg']
        let err = null;
        if(!file) return err = "File does not exist."
      
        if(file.size > 1024 * 1024) // 1mb
          err = "The largest image size is 1mb"
      
        if(!types.includes(file.type))
          err = "The image type is png / jpeg"

        if(!err) setInput({ ...inputs, img: file })
        return  toast.error(err);
    }      
    const handlePublish = async (e) => {
        e.preventDefault()
        if(checkForm()){
            
      
        if (state){
            setLoading(true)
            const formData = new FormData();
            formData.append('title', inputs.title)
            formData.append('body', content)
            formData.append('cat', inputs.cat)
            formData.append('authur', currentUser.id)
            formData.append('slug', slugify(inputs.title))
            formData.append('img', inputs.img)
            try{
            const res = await instance.put(`/posts/${state.slug}`,formData)
            const {slug, cat} = res.data
            navigate(`/${cat}/${slug}/`)
            }catch(err) {
                console.log(err)
                setLoading(false)
            }
            
           
        }
        else{
            setLoading(true)
            const formData = new FormData();
            formData.append('title', inputs.title)
            formData.append('body', content)
            formData.append('cat', inputs.cat)
            formData.append('authur', currentUser.id)
            formData.append('slug', slugify(inputs.title))
            formData.append('img', inputs.img)
            try{
            const res = await instance.post('/posts/createPost',formData)
            const {slug, cat} = res.data
            navigate(`/${cat}/${slug}/`)
     }catch(err) {
        setLoading(false)
        console.log(err.response.data)
     } 
    }

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
                {/* <FileBase
        type="file"
        multiple={false}
        onDone={file => checkImage(file) //setInput({ ...inputs, img: base64 })
        }
      />*/} 
       <input type="file" onChange={e => checkImage(e.target.files[0])} />
       
                    <br/>
                    {err["img"] && <p className='danger'>{err["img"]}</p>}
                    <br/>

                    <div className='buttons'>
                        <button >Save as Draft</button>
                        {loading === true?
                         <Box sx={{ display: 'flex' }}>
                         <CircularProgress />
                       </Box>
                        :
                        <button onClick={handlePublish}>Publish</button>
}
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
                    <input type="radio" name="cat" checked={inputs.cat === "OffensiveSec"} value="OffensiveSec" onChange={handleChange}/>
                    <label htmlFor="Offensive Security">Offensive Security</label>
                    </div>
                    <div className='cat'>
                    <input type="radio" name="cat" checked={inputs.cat === "ML"} value="ML" onChange={handleChange}/>
                    <label htmlFor="Machine Learning">Machine Learning</label>
                    </div>
                </div>
             </div>
        </div>
    );
};

export default Create;