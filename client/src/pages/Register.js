import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import instance from '../config/axios.js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [err, setErr] = useState()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const validateEmail = (email) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     
        if (regex.test(email)) {
            setInputs(prev => ({...prev, email: email}))
            setErr("")
          } else {
            setErr('Invalid email address');
          }
      }

    
    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
       
    }
    const submitChange = async (e) => {
        e.preventDefault()
        if(inputs.email && inputs.username && inputs.password){
           
        setErr("")
        setLoading(true)
        try{
        await instance.post('auth/register', inputs)
        navigate('/login')
        setLoading(false)
        }catch(err) {
            setLoading(false)
            setErr(err.response.data.message)
            console.log(err)
           
        }
        setLoading(false)
    }
    }
    return (
        <div className='auth'>
            <h1>Register</h1>
            <form>
            
                {err && <p className='danger'>{err}</p>}
                <input type='text' placeholder="username" name="username" onChange={handleChange}/>
                <input type='email' placeholder="email" name="email" onChange={e => validateEmail(e.target.value)} />
                <input type="password" placeholder="password" name="password" onChange={handleChange}/>
                {!loading?
                <button onClick={submitChange}> Register</button>
                :
                <Box sx={{ display: 'flex',justifyContent:'center', alignItems:'center' }}>
                <CircularProgress />
              </Box>
}
                <span>Have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    );
};

export default Register;