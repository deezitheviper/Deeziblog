import React, { useContext, useState } from 'react';
import logo from '../assets/img/Deeziblog.png';
import {Link, useNavigate} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputIcon from '@mui/icons-material/Input';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { AuthContext } from '../context/authContext';
import SearchIcon from '@mui/icons-material/Search';


const Header = () => {
    const {currentUser, logout} = useContext(AuthContext)
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const searchPost =  async () => {
        if(search.trim()){
            navigate(`/Articles/Search?article=${search}`)
        }else{
            navigate('/')
        }
    }
    const handleKeyPress = (e) => {
        if(e.keyCode == 13)
            searchPost()
    }
    return (
        <>
        <div className='navbar'>
            <div className='container'>
                
                <div><Link to="/"><img className='logo' src={logo} alt="deeziblog" /></Link></div>
                <div className='links'>
                    
                    <Link to="/Python" className='link'><h6>Python </h6></Link>
                    <Link to="/Javascript" className='link'><h6>Javascript</h6></Link>
                    <Link to="/OffensiveSec" className='link'><h6>Offensive Security</h6></Link>
                    <Link to="/ML" className='link'><h6>Machine Learning</h6></Link>
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
        <div className='searchbar' >
                <input type="text" className='bar' onChange={e => setSearch(e.target.value)} placeholder='Search Articles...' onKeyDown={handleKeyPress} /> <SearchIcon onClick={searchPost} />
                </div>
        </>
    );
};

export default Header;