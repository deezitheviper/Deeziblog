import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    const postapi=[
        {
            "id":1,
            "title":"PLACEBEARD Built as a foil",
            "text":"Built as a foil to placekitten, PlaceBeard.it offers something more earthy, more manly. Choose color or grayscale placeholder beards in every proportion for your next project.",
            "img": "https://placebeard.it/640x360"
        },
        {
            "id":2,
            "title":"BACONMOCKUP Yep, it exists",
            "text":"Yep, it exists. The even meatier complement to Bacon Ipsum, make every client salivate over your designs with juicy, red placeholder images of, you guessed it, bacon.",
            "img": "https://baconmockup.com/640/360"
        },
        {
            "id":3,
            "title":"PLACEBEAR The classic latin",
            "text":"The classic latin passage that just never gets old, enjoy as much (or as little) lorem ipsum as you can handle with our easy to use filler text generator",
            "img": "https://placebear.com/640/360"
        },
        {
            "id":4,
            "title":"LOREMFLICKR A fun twist",
            "text":"A fun twist on the popular photo sharing site, LoremFlickr surfaces Creative Commons licensed Flickr photos for use as placeholder images. Plug in some dimensions and off you go!.",
            "img": "https://loremflickr.com/640/360"
        }
    ]
    return (
        <div className='home'>
            <div className='posts'>
                {
                    postapi.map(post => (
                        <div className='post' key={post.id}>
                            <div className='img'>
                            <img  src={post.img} alt="" />
                            </div> 
                            <div className='content'>
                                <Link className="title" to={`/post/${post.title}`}>
                                <h1>{post.title}</h1>
                                </Link>  
                                <p>{post.text.slice(0, 400)}</p>   
                               <button>Read more</button>
                            </div>
                        </div>
                    ))
                }
            </div>
             
        </div>
    );
};

export default Home;