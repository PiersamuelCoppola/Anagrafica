import React from 'react'
import { Link } from 'react-router-dom'

const HeaderComponent = () => {
    return (
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <span style={{color:"red"}} className="navbar-brand mb-0 h1">User Management Application</span>
                <Link to="/login" className="btn btn-primary"> Log In </Link>
                </div>
        </nav>
    )
}

export default HeaderComponent