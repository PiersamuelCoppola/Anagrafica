import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const HeaderComponent = () => {

    const navigate = useNavigate();

    const { setAuthUser, isAuthenticated, setIsAuthenticated } = useAuth();
    
    useEffect(() => {
        console.log("HEADER isAuthenticated: ", isAuthenticated);
    }, [isAuthenticated]);

    const logOut = (e) => {
        e.preventDefault()
        setIsAuthenticated(false)
        setAuthUser(null)
        navigate('/');
    }

    const logIn = (e) => {
        e.preventDefault()
        navigate('/login');
    }


    return (
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <span style={{ color: "red" }} className="navbar-brand mb-0 h1">User Management Application</span>
                {
                    isAuthenticated
                        ? (<button className="btn btn-succes btn-primary" onClick={(e) => logOut(e)}> Log Out </button>)
                        : (<button className="btn btn-succes btn-primary" onClick={(e) => logIn(e)}> Log in </button>)
                }
            </div>
        </nav>
    )
}

export default HeaderComponent