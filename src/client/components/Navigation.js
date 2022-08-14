import React, {useState} from 'react';
import axios from 'axios';

function Navigation(props)
{
    const [post, addPost] = useState({_id: '', posts: [], username: ''});

    function fetchPosts()
    {
       fetch('/api/posts')
       .then(res => res.json())
       .then(data => addPost({_id: data._id, posts: data}))
       .catch(err => console.error(err))
    }

    return(
        <nav className="navbar bg-light">
        <div className="container-fluid">
         <a className="navbar-brand">Post App</a>
         <form className="d-flex" role="search" onSubmit={(e) => 
            {
                e.preventDefault();
                if(post._id)
                {
                axios.get(`http://localhost:2112/api/posts/${post._id}`)
                } else {
                    alert('Not found')
                }
            }}>
            <input className="form-control me-2" type="search" placeholder="search for username" aria-label="Search" onChange=
            {
                (s) =>
                {
                    addPost({
                        username: s.target.value
                    });
                }
            }></input>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <ul className='navbar-nav nav-flex-icons'>
                <li className='nav-item'>
                   <a className='nav-link' href='https://www.facebook.com/ChristianTomas08' target='_BLANK'> 
                   <i className="fa-brands fa-facebook"></i>
                   </a> 
                </li>
                <li className='nav-item'>
                   <a className='nav-link' href='https://www.linkedin.com/in/tomas-a-904b34232/' target='_BLANK'> 
                   <i className="fa-brands fa-linkedin"></i>
                   </a> 
                </li>
                <li className='nav-item'>
                   <a className='nav-link' href='https://www.instagram.com/tomas_christian213/' target='_BLANK'> 
                   <i className="fa-brands fa-instagram"></i>
                   </a> 
                </li>
                <li className='nav-item'>
                   <a className='nav-link' href='https://github.com/RyuTsuki08/' target='_BLANK'> 
                   <i className="fa-brands fa-github"></i>
                   </a> 
                </li>
                </ul>
     </div>
    </nav>
    )
}

export default Navigation;