import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {instance} from '../config/axios.js';

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [err, setErr] = useState()
    const navigate = useNavigate()


    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
       
    }
    const submitChange = async e => {
        e.preventDefault()
        const res = await instance.post('auth/register', inputs)
        .catch(err => setErr(err))
        console.log(res)
        navigate('/login')
    }
    return (
        <div className='auth'>
            <h1>Register</h1>
            <form>
            
                {err && <p className='danger'>{err}</p>}
                <input type='text' placeholder="username" name="username" onChange={handleChange}/>
                <input type='email' placeholder="email" name="email" onChange={handleChange} />
                <input type="password" placeholder="password" name="password" onChange={handleChange}/>
                
                <button onClick={submitChange}>Register</button>
                <span>Have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    );
};

export default Register;