import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import { useTranslation } from "react-i18next";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const HeaderComponent = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.isLoggedIn)
    const userStore = useSelector((state) => state.auth.user)
    const { t } = useTranslation();

    const logOut = (e) => {
        e.preventDefault()
        dispatch(logout())
        navigate('/');
    }

    const logIn = (e) => {
        e.preventDefault()
        navigate('/login');
    }

    const signUp =  (e) => {
        e.preventDefault();
       navigate('/registration')
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#121212',
            },
        },
    });

    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <div className="container-fluid">
                            <span style={{ color: "red" }} className="navbar-brand mb-0 h1">{t("headerComponent.title")}</span>
                        </div>
                        <Typography variant="h6" component="div">
                            {
                                auth
                                    ? <div style={{ display: "flex" }}>
                                        <h5 style={{ color: "white", alignItems: "center" }} className="text-center text-white"> {userStore.email} </h5>
                                        <Button variant="contained" style={{ backgroundColor: "#d32f2f", float: "right", fontWheight: 'bold', marginLeft: "10px", width: "125px" }} onClick={(e) => logOut(e)}> {t("bottoni.logout")} </Button>
                                    </div>
                                    : <div style={{ display: "flex", justifyContent: 'flex-start', gap: '10px' }}>
                                        <Button variant="contained" style={{ backgroundColor: "#1976D2", borderColor: "blue", float: "right", width: "100px" }} onClick={(e) => signUp(e)}> {t("bottoni.register")} </Button>
                                        <Button variant="contained" style={{ backgroundColor: "#2e7d32", borderColor: "green", float: "right", width: "100px" }} onClick={(e) => logIn(e)}> {t("bottoni.login")} </Button>
                                    </div>

                            }
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>

    )
}

export default HeaderComponent