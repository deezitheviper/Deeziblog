import React from 'react';

const Sidebar = () => {
    return (
        <div >
            
            <div className='sidebar'>
            <h3>More from Deeziblog</h3>
            <div className='content'>
            <div className='l-content'>
             <div className='profile'>
               <img src='https://www.fillmurray.com/640/360' alt="account" />
               <div className='info'>
                   <span>John</span>    
                </div>
             </div>
             <h3>Mollit swine ex, dolor beef strip steak nulla non aliquip. Cupidatat
             </h3>

             </div>
             <div className='r-content'>
             <img src="https://placebeard.it/640x360" alt=""/>
             </div>
             </div>
             </div>
        </div>
    );
};

export default Sidebar;