import React, { useState, useEffect } from 'react';
import FormCard from './Form_card';
import Navigation from './Navigation';
import Avatar from '@mui/material/Avatar';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import axios from 'axios';

function App(props)
{
    const [post, addPost] = useState({_id: '', username : '', filename: '' ,posts: [] ,  title: '', description: ''});

    function fetchPosts()
    {
       fetch('/api/posts')
       .then(res => res.json())
       .then(data => addPost({posts: data}))
       .catch(err => console.error(err))
    }
    return(
    <div onLoad={fetchPosts()} id='container'>
        <Navigation></Navigation>
        <main id="scroll-app">
        <FormCard></FormCard>
        <div id="scroll-posts">
                {
                    post.posts.map(post =>
                        {
                        return (
                            <div className="card Card-post" id="Card"key={post._id}>
                                <div className='card-header'>
                                    <div id='title-username'>
                                        <Avatar variant="circular" >
                                            {post.username[0]}
                                        </Avatar>
                                        <div className='titles'>
                                        <h2>{post.username}</h2>
                                        <span>{post.title}</span>
                                        </div>
                                        </div>
                                    <div className='icons'>
                                        <ModeEditRoundedIcon id="button-card" onClick={(_id) => 
                                        {
                                            fetch(`/api/posts/${post._id}`)
                                            .then(res => res.json())
                                            .then(data => {
                                                addPost({
                                                    _id: data._id,
                                                    username: data.username,
                                                    title: data.title,
                                                    filename: data.filename,
                                                    description: data.description
                                                })
                                            })
                                            .catch(err => console.error(err))
                                        }}></ModeEditRoundedIcon>
                                        <RemoveRoundedIcon id="button-card" onClick={(_id) => 
                                        { 
                                               if(confirm('Are you sure of delete it this post?')){
                                                   fetch(`/api/posts/${post._id}`, {
                                                       method: 'DELETE',
                                                       headers: {
                                                           'Accept': 'application/json',
                                                          'content-type': 'application/json'
                                                    }
                                                   })
                                                   .then(res => res.json())
                                                  .then(data => {
                                                       console.log(data);
                                                    fetchPosts(); 
                                                })
                                            } else{
                                                alert('operation canceled')
                                            }
                                        }
                                        }></RemoveRoundedIcon>
                                    </div>
                                    </div>
                                    <div className='card-body'>
                                        <div className='images'>
                                            <img  src={`img/uploads/${post.filename}`} alt="" />
                                        </div>
                                    </div>
                                    <div className='card-footer'>
                                        <p>{post.description}</p>
                                    </div>
                                </div>
                        )
                    }
                    )    
                }
        </div>
        </main>
    </div>
    )
}

export default {App, handleSubmit};
