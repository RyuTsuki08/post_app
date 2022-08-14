import React, { useState, useEffect } from 'react';
import FormCard from './Form_card';
import Navigation from './Navigation';
import Avatar from '@mui/material/Avatar';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { FormControl, FilledInput ,TextField, InputAdornment, InputBase} from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';



function App(props)
{
    const [post, addPost] = useState({_id: '', username : '', filename: '' ,posts: [] ,  title: '', description: ''});
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                                            handleOpen()
                                            NewForm();
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
                                        <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                        >
                                        <Box >
                                        <div id="content-modal">
                                            <h3>Lo siento, no puedo editar tu post aun</h3>
                                            <img src='img/editPost.svg'/>
                                        </div>
                                        </Box>
                                    </Modal>
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


export default App;
