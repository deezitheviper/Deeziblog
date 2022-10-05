import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className='auth'>
            <h1>Register</h1>
            <form>
                <input type='text' placeholder="username"/>
                <input type='email' placeholder="email"/>
                <input type="password" placeholder="password"/>
                
                <button>Register</button>
                <span>Have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    );
};

export default Register;