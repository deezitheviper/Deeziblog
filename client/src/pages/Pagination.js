import React, { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

import { Link } from 'react-router-dom';
import instance from '../config/axios';


const Pagin = ({data}) => {
    const {page, totalPages} = data;

    return (
        <div>
            <Pagination 
            count={totalPages} 
            page={page} 
            color="primary" 
            renderItem={(item) => (
                <PaginationItem
                  {...item}
                  component={Link}
                  to={`/Articles?page=${item.page}`}
                />
              )}
            />

        </div>
    );
};

export default Pagin;