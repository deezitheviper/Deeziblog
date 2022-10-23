import React,{useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../config/axios.js';
import { AuthContext } from '../context/authContext.js';


const Login = () => {
    const [inputs, setInputs] = useState({
        'id':"",
        'password': ""
    });
    const [err, setErr] = useState("");
    const {login} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const res = await login(inputs)
        .catch(err =>{
         setErr(err.response.data.message)
        })
        if(res === 200)
            navigate('/')
    
       
    }
    return (
        <div className='auth'>
            <h1>Login</h1>
            <form>
            {err && <p className='danger'>{err}</p>}
                <input type='text' placeholder="username or email" name="id" onChange={handleChange} />
                <input type="password" placeholder="password" name="password" onChange={handleChange}/>
                <button onClick={handleSubmit}> Login </button>
                <span>No account? <Link to="/register">Register</Link></span>
            </form>
        </div>
    );
};

export default Login;