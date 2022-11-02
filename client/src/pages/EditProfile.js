import React, { useEffect, useState } from 'react';
import instance from '../config/axios';
import { Divider } from '@mui/material';
import {toast} from "react-toastify";


const EditProfile = ({data}) => {
    const {username,_id, email} = data.currentUser;
    const {file} = data;
    const [update, setUpdate] = useState(false)
    const [inputs, setInputs] = useState({
        useremail:"",
        img:"",
        password: "",
        confirmpassword: ""
    })
    const [err, setErr] = useState({})
    const {password,confirmpassword, img, useremail} = inputs;
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
        if(img || useremail){

            if(checkForm() == true){
               
                try{
            const res = await instance.patch(`user/${username}`,{img,email})
           toast.success(res.data)
                }catch(err) {
                     console.log(err)
                }
        }
        }
        if(password){
            if(checkPass() == true){
        
            const res = await instance.patch(`user/resetpass/${_id}`,{password})
            .catch(err => console.log(err))
           toast.success(res.data)
            }
        }
     
    }
 
useEffect(()=>{
    if(file){
        setUpdate(true)
    }
},[file])

    return (
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

                <button onClick={handleSubmit}  >Update Profile</button> 
                </div>
                </form>
                
            </div>
        </div>
    );
};

export default EditProfile;