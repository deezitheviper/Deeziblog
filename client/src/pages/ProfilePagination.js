import React, { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

import { Link } from 'react-router-dom';



const ProfilePagin = ({data}) => {
    const {page,authur,totalP} = data;

    return (
        <div>
            <Pagination 
            count={totalP} 
            page={page} 
            color="primary" 
            renderItem={(item) => (
                <PaginationItem
                  {...item}
                  component={Link}
                  to={`/profile/${authur}/?page=${item.page}`}
                />
              )}
            />

        </div>
    );
};

export default ProfilePagin;