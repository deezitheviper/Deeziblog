import React from 'react';
import logo from '../assets/img/Deeziblog.png';
import {Link} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';



const Header = () => {
    return (
        <>
        <div className='navbar'>
            <div className='container'>
                
                <div><img className='logo' src={logo} alt="deeziblog" /></div>
                <div className='links'>
                    
                    <Link className='link'><h6>Python </h6></Link>
                    <Link className='link'><h6>Javascript</h6></Link>
                    <Link className='link'><h6>Offensive Security</h6></Link>
                    <Link className='link'><h6>Machine Learning</h6></Link>
                    <Tooltip title="Profile">
                    <span><AccountCircleIcon/></span>
                    </Tooltip>
                    <Tooltip title="Logout">
                    <span><LogoutIcon/></span>
                    </Tooltip>
                    <Tooltip title="create">
                    <span><Link to="/create"><CreateIcon className='create' /></Link></span>
                    </Tooltip>
                </div>
                
            </div>
   
        </div>
      
        </>
    );
};

export default Header;