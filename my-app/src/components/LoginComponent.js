import React, { useEffect, useState } from 'react'
import UserServiceFE from '../services/UserServiceFE'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'

const LoginComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setAuthUser } = useAuth();
    const auth = useSelector((state) => state.auth.isLoggedIn)

    useEffect(() => {
        console.log("LoginComponent: " + auth)
        // Se l'utente non è autenticato, reindirizza alla pagina di login
        if (auth) {
            navigate('/home');
            return;
        }
    }, [auth, navigate]);

    const Login = async (e) => {
        e.preventDefault();
        const user = { email, password, role }
        try {
            // Esegui la chiamata al servizio di login
            const response = await UserServiceFE.logIn(user);
            // Prendi il token dalla risposta del backend
            const token = response.data["token"];
            // Imposta l'utente e lo stato di autenticazione
            dispatch(login())
            setAuthUser(user);
            if (token) {
                console.log(response.data["token"]);
                // Salva il token nel localStorage
                // Con localStorage il token viene salvato in locale sul browser 
                // Con sessionStorage il token dura solo per la sessione attuale:
                sessionStorage.setItem('ACCESSToken', token);
                sessionStorage.setItem('role', response.data["role"]);
                setRole(response.data["role"]);
                // Reindirizza alla home page o alla pagina desiderata
                navigate('/home');
            } else {
                console.error("Token non trovato nella risposta");
            }

        } catch (error) {
            console.error("Errore durante il login:", error);
        }
    }

    return (
        <div>
            <br /> <br />
            <div className="contaniner">
                <div className="row justify-content-center align-items-center" style={{ height: "75vh" }}>
                    <div className="card col-md-3">
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label"> Email :</label>
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}

                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Password :</label>
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        name="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}

                                    >
                                    </input>
                                </div>

                                <button className="btn btn-succes btn-primary" onClick={(e) => Login(e)}> Log in </button>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginComponent
