import React, { useEffect, useState } from 'react';
import instance from '../config/axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const CAvatar = ({data}) => {
    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getAvatar = async () => {
            setLoading(true)
        const res = await instance.get(`user/avatar/${data}`)
        .catch(err => console.log(err))
        setAvatar(res.data)
        setLoading(false)
        }
        getAvatar()
    },[data])
    return (
        <div>
            {loading?
   <Box sx={{ display: 'flex' }}>
   <CircularProgress />
 </Box>
 :
            <img src={avatar} alt=""/>
}
        </div>
    );
};

export default CAvatar;