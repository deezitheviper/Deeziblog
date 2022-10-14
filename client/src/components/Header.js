import React, { useContext } from 'react';
import logo from '../assets/img/Deeziblog.png';
import {Link} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputIcon from '@mui/icons-material/Input';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { AuthContext } from '../context/authContext';


const Header = () => {
    const {currentUser, logout} = useContext(AuthContext)
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
                    {currentUser?
                    <>
                    <Tooltip title={`${currentUser?.username}`}>
                    <span><AccountCircleIcon/></span>
                    </Tooltip>
                    <Tooltip title="Logout">
                    <span><LogoutIcon onClick={logout} /></span>
                    </Tooltip>
                    <Tooltip title="create">
                    <span><Link to="/create"><CreateIcon className='create' /></Link></span>
                    </Tooltip>
                    </>
                    : 
                    <>
                    <Tooltip title={`Login`}>
                    <span><Link to="/login"><LoginIcon/></Link></span>
                    </Tooltip>
                    <Tooltip title="Register">
                    <span><Link to="/register"><InputIcon /></Link></span>
                    </Tooltip>
                    </>
                    }
                    
                </div>
                
            </div>
   
        </div>
      
        </>
    );
};

export default Header;