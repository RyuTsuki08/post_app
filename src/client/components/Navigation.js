import React from 'react';

function Navigation(props)
{
    return(
        <nav className="navbar bg-light">
        <div className="container-fluid">
         <a className="navbar-brand">Post App</a>
         <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Title of post" aria-label="Search"></input>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
     </div>
    </nav>
    )
}

export default Navigation;