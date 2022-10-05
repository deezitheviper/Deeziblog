import React from 'react';
import logo from '../assets/img/viperlogo.png';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className='navbar'>
            <div className='container'>
                
                <div className='logo'><img src={logo} alt="deeziblog" style={{height:'100px'}}/></div>
                <div className='links'>
                    
                    <Link className='link'>Python</Link>
                    <Link className='link'>Javascript</Link>
                    <Link className='link'>Offensive Security</Link>
                </div>
                
            </div>
        </div>
    );
};

export default Header;