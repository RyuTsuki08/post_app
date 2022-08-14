import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, FilledInput ,TextField, InputAdornment, InputBase} from '@mui/material';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';

function FormCard(submitForm)
{

    const [post, addPost] = useState({username : '', filename: '' ,  title: '', description: ''});

    function fetchPosts()
    {
       fetch('/api/posts')
       .then(res => res.json())
       .then(data => console.log(data))
       .catch(err => console.error(err))
    }

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
                const formData = new FormData();
                formData.append('username', post.username);
                formData.append('image', post.filename)
                formData.append('title', post.title)
                formData.append('description', post.description)
            const res = await axios.post('http://localhost:2112/api/posts', formData)
            addPost({
                username: '',
                filename: '',
                title: '',
                description: ''
            });
            fetchPosts();
        }

    return(
        <div className='container'>
                    <div className='card caaard'>
                        <div className="card-header">
                            <h3>What you think today?</h3>
                        </div>
                        <div className='card-content'>
                <form encType='multipart/form-data' className='form' onSubmit={handleSubmit()}>
                    <div className='form-group'>
                <TextField   id="input-with-icon-textfield"
            label="Username"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <AccountCircle />
                </InputAdornment>
            ),
            }}
            variant="standard" type='text' name="username" onChange={(u) => 
                {
                    addPost({
                        username: post.username = u.target.value,
                        filename: post.filename,
                        title: post.title,
                        description: post.description
                    });
                }} value={post.username} >
                    </TextField>
                <TextField  id="standard-basic" label="Title" variant="standard" type='text' name="title" onChange={(t) => 
                {
                    addPost({
                        username: post.username,
                        filename: post.filename,
                        title: post.title = t.target.value,
                        description: post.description
                    });
                }} value={post.title} ></TextField>
                
                <TextField multiline={true} id="standard-basic" label="Description" variant="standard" type='text' name='description' onChange={(d) => 
                {
                    addPost({
                        username: post.username,
                        filename: post.filename,
                        title: post.title,
                        description: post.description = d.target.value
                    });
                }} value={post.description} ></TextField>
                </div>
                <div className="choose-file">
                <input type='file' name="image" accept="image/*" className="form-control" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" aria-label="Upload"
                onChange={(f) =>
                {
                    addPost({
                        username: post.username,
                        filename: post.filename = f.target.files[0],
                        title: post.title,
                        description: post.description
                    })
                }}></input>
                </div>
                <div className='button'>
                <Button type='submit'>Send</Button>
                </div>
                </form>
        </div>
                    </div>
                    <div id='img-outer'>
                        <img src='img/outer_space.svg' alt=''/>
                    </div>
        </div>
    )
}

export default FormCard;