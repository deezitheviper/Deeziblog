import React from 'react';
import ReactQuill from 'react-quill';


const Create = () => {
    return (
        <div className='create'>
             <div className='content'>
                <input type="text" placeholder='Title' />
                <div className='editorContainer'>
                    <ReactQuill  className="editor" theme="snow"/>
                </div>
             </div>
             <div className='sidebar'>
                <div className='item'>
                    <h1>Publish</h1>
                    <span><b>Status :</b> Draft</span>
                    <span><b>Visibility :</b> Public</span>
                    <input style={{display: "none"}} type="file"/>
                    <label className='file' htmlFor="file">Upload Image</label>
                    <div className='buttons'>
                        <button >Save as Draft</button>
                        <button >Publish</button>
                    </div>
                </div>
                <div className='item'>
                    <h1>Category</h1>
                    <div className='cat'>
                    <input type="radio" name="cat" value="Javascript"/>
                    <label htmlFor='radio'>Javascript</label>
                    </div>
                    <div className='cat'>
                    <input type="radio" name="cat" value="Python"/>
                    <label htmlFor="Python">Python</label>
                    </div>
                    <div className='cat'>
                    <input type="radio" name="cat" value="Offensive Security"/>
                    <label htmlFor="Offensive Security">Offensive Security</label>
                    </div>
                    <div className='cat'>
                    <input type="radio" name="cat" value="Machine Learning"/>
                    <label htmlFor="Machine Learning">Machine Learning</label>
                    </div>
                </div>
             </div>
        </div>
    );
};

export default Create;