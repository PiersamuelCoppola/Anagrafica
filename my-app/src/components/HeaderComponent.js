import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'

const HeaderComponent = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.isLoggedIn)
    const userStore = useSelector((state) => state.auth.user)

    const logOut = (e) => {
        e.preventDefault()
        dispatch(logout())
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
                        ? <div style={{ display : "flex"}}>
                            <h2 style={{ color: "white", textAlign: "right" }} className="text-right text-white"> {userStore.email} </h2>
                            <button style = {{float: "right"}}className="btn btn-succes btn-primary" onClick={(e) => logOut(e)}> Log Out </button>
                           </div> 
                        : <button className="btn btn-succes btn-primary" onClick={(e) => logIn(e)}> Log in </button>
                }  
            </div>
        </nav>
    )
}

export default HeaderComponent