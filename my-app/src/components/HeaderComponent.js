import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'

const HeaderComponent = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setAuthUser } = useAuth();
    const auth = useSelector((state) => state.auth.isLoggedIn)

    const logOut = (e) => {
        e.preventDefault()
        dispatch(logout())
        setAuthUser(null)
        sessionStorage.removeItem("ACCESSToken")
        sessionStorage.removeItem("role")
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
                    auth
                        ? (<button className="btn btn-succes btn-primary" onClick={(e) => logOut(e)}> Log Out </button>)
                        : (<button className="btn btn-succes btn-primary" onClick={(e) => logIn(e)}> Log in </button>)
                }
            </div>
        </nav>
    )
}

export default HeaderComponent