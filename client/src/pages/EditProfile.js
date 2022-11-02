import React, { useEffect, useState } from 'react';
import instance from '../config/axios';
import { Divider } from '@mui/material';
import {toast} from "react-toastify";


const EditProfile = ({data}) => {
    const {username,_id, email} = data.currentUser;
    const {file} = data.file;
    const [inputs, setInputs] = useState({
        useremail:"",
        img:"",
        password: "",
        confirmpassword: ""
    })
    const [err, setErr] = useState()
    const {password,confirmpassword, img, useremail} = inputs;
    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
       
    }


  

    const checkPass = e => {
        let err=false
        if(password !== confirmpassword){
            setErr('Password don\'t match')
        }
        return err;
    }

    const handleSubmit = async () => {
        if(img || email){
            const res = await instance.patch(`user/${username}`)
            .catch(err => console.log(err))
        }
        if(password){
            const res = await instance.patch(`user/resetpass/${_id}`)
            .catch(err => console.log(err))
            toast.success(res.data)
        }
    }
 


    return (
        <div div className='profile-blog'>
            <div className='blog-content edit-profile'>
            <form>
                <div className='username'>
                <label>Username: </label><input type="text" value={username} disabled />
                </div>
                <div className='email'>
                <label>Email: </label> <input name="useremail" type="email" onChange={handleChange} defaultValue={email} />
                </div>
               <Divider/>
                <p>New Password</p>
                <input type="password" placeholder="Password" onChange={handleChange} name="password" />
                <input type="password" placeholder="Confirm Password" onChange={handleChange} onBlur={checkPass} name="confirmpassword" />
                <div>
                <button>Update Profile</button> 
                </div>
                </form>
                
            </div>
        </div>
    );
};

export default EditProfile;