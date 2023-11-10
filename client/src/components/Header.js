import React, { useContext, useState, useEffect } from 'react';
import logo from '../assets/img/deezi.png';
import {Link, useNavigate} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputIcon from '@mui/icons-material/Input';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { AuthContext } from '../context/authContext';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';


const Header = () => {
    const {currentUser, logout} = useContext(AuthContext)
    const [search, setSearch] = useState('');
    const [expanded, setExpanded] = useState(false)
    const navigate = useNavigate();





    const searchPost =  async () => {
        if(search.trim()){
            navigate(`/Articles/Search?article=${search}`)
        }else{
            navigate('/')
        }
    }
    const handleKeyPress = (e) => {
        if(e.keyCode === 13)
            searchPost()
    }

    useEffect(()=> {
        setExpanded(false)
    },[navigate])
    return (
        <>
        <div className='navbar'>
            <div className='container'>
                
                <div><Link to="/"><img className='logo' src={logo} alt="deeziblog" /></Link></div>
                <MenuIcon className="hamburger" onClick={() => setExpanded(!expanded)}/>
                <div className={expanded?'links expanded': 'links'}>
                    
                    <Link to="/Category/Python" className='link'><h6>Python </h6></Link>
                    <Link to="/Category/Javascript" className='link'><h6>Javascript</h6></Link>
                    <Link to="/Category/OffensiveSec" className='link'><h6>Offensive Security</h6></Link>
                    <Link to="/Category/ML" className='link'><h6>Machine Learning</h6></Link>
                    {currentUser?
                    <>
                    
                    <Tooltip title={`${currentUser?.username}`}>
                        {currentUser.profilepic?
                    <div className='headerprofile account'>
                        <Link to={`/profile/${currentUser.username}`}><img src={currentUser.profilepic} alt="" /></Link> 
                    </div>    
                    :
                    <Link to={`/profile/${currentUser.username}`}><AccountCircleIcon  className='account'/></Link>
                        }
                    </Tooltip>
                    <Tooltip title="Logout">
                   <LogoutIcon color='#0e60b5' className='account' onClick={logout} />
                    </Tooltip>
                    <Tooltip title="create">
                    <Link to="/create">
                        <CreateIcon color='#0e60b5' className='write' /></Link>
                    </Tooltip>
                    
                    </>
                    : 
                    <>
                    <Tooltip title={`Login`}>
                   <Link to="/login"><LoginIcon color='#0e60b5' className='account'/></Link>
                    </Tooltip>
                    <Tooltip title="Register">
                   <Link to="/register"><InputIcon color='#0e60b5' className='account' /></Link>
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