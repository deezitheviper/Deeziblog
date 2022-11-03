import React, { useEffect, useState } from 'react';
import instance from '../config/axios';

const CAvatar = ({data}) => {
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const getAvatar = async () => {
        const res = await instance.get(`user/avatar/${data}`)
        .catch(err => console.log(err))
        setAvatar(res.data)
        }
        getAvatar()
    },[data])
    return (
        <div>
            <img src={avatar} alt=""/>
        </div>
    );
};

export default CAvatar;