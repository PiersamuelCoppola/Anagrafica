import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UserServiceFE from '../services/UserServiceFE';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, getToken } from '../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';

const LoginComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.isLoggedIn);
    const token = useSelector((state) => state.auth.token);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { t } = useTranslation();

    useEffect(() => {
        if (auth) {
            navigate('/home');
            return;
        }
    }, [auth, navigate]);

    const Login = async (data) => {
        const user = { email: data.email, password: data.password };
        const userSenzaPassword = { email: data.email, role: '' };
        try {
            const response = await UserServiceFE.logIn(user);
            if (response.data["statusCode"] !== 500) {
                userSenzaPassword.role = response.data["role"];
                dispatch(login(userSenzaPassword));
                dispatch(getToken(response.data["token"]));
                if (token) {
                    navigate('/home');
                } else {
                    console.error("Token non trovato nello stato");
                }
            } else {
                toast.error("Dati invalidi");
            }
        } catch (error) {
            console.error("Errore durante il login:", error);
        }
    }

    return (
        <div>
            <br /> <br />
            <div className="container">
                <div className="row justify-content-center align-items-center" style={{ height: "75vh" }}>
                    <div className="card col-md-3">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(Login)}>
                                <div className="form-group mb-2">
                                    <label className="form-label"> Email :</label>
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        className="form-control"
                                        {...register("email", {
                                            required: "Email obbligatoria",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Indirizzo email non valido"
                                            }
                                        })}
                                    />
                                    {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Password :</label>
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        className="form-control"
                                        {...register("password", { required: "Password obbligatoria" })}
                                    />
                                    {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
                                </div>

                                 <Button variant="contained" color="success" style={{ borderColor: "green", float: "right" }} type='submit'> {t("bottoni.login")} </Button>
                                <ToastContainer />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;
