import React, { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

import { Link } from 'react-router-dom';

const CommentP = ({data}) => {
    const {totalP, post, page} = data;
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
                  to={`/${post.cat}/${post.slug}/?page=${item.page}`}
                />
              )}
            />
        </div>
    );
};

export default CommentP;