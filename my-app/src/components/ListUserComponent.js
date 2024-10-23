import React, { useState, useEffect } from 'react'
import UserServiceFE from '../services/UserServiceFE'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const ListUserComponent = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState([])
    const auth = useSelector((state) => state.auth.isLoggedIn)
    const token = useSelector((state) => state.auth.token)
    const userStore = useSelector((state) => state.auth.user)
    const { t } = useTranslation();

    //effetto da renderizzare quando si renderizza la pagina
    useEffect(() => {
         // Se l'utente non è autenticato, reindirizza alla pagina di login
         if (!auth) {
            navigate('/login');
        }
        //chiamata al service per eseguire la GetAllUser
        UserServiceFE.getAllUser(token).then(response => {
            setUser(response.data)
            console.log(response.data)
        }).catch(error => {
            console.log(error);
        })
         // Carica gli utenti solo se l'utente è autenticato
         loadUsers();
    }, [auth, navigate, token])

    //funzione definita per ricaricare in automatico la pagina quando viene effettuata la cancellazione
    const loadUsers = async () => {
        try {
            if (token) {
                const result = await axios.get("http://localhost:8080/user/getAllUser", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(result.data);
            } else {
                toast.error("Token non presente, operazione non eseguibile");
            }
        } catch (error) {
            console.log(error);
            toast.error("Errore durante il caricamento degli utenti");
        }
    }

    //cancellazione di un user
    const deleteUser = async (id) => {
        let AuthStr = "";
        if (!token) {
            //visualizzo il toast se ad esempio cancello il token dalla sessione e voglio eseguire la delete
            toast.error("Token non presente, operazione non eseguibile");
        } else {
            AuthStr = 'Bearer '.concat(token);
        }
        try {
            await axios.delete(`http://localhost:8080/user/cancellaUser/${id}`, { headers: { Authorization: AuthStr } })
            loadUsers();//funzione definita sopra
        } catch (error) {
            if (error.response.status === 403) {
                console.log("Richiesta non autorizzata");
                toast.error("Richiesta non autorizzata");
            }
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: false,
        },
        {
            field: 'password',
            headerName: 'Password',
            width: 550,
            editable: false,
        },
        {
            field: 'Role',
            headerName: t("listUserComponent.role"),
            width: 110,
            editable: false,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row?.authorities?.map((el) => {
                            return (
                                <div>
                                    {el.authority}
                                </div>
                            )
                        })}
                    </div>)
            }
        },
        {
            field: 'Actions',
            headerName: t("listUserComponent.actions"),
            width: 325,
            renderCell: (params) => (
                <div>
                    <Button 
                        variant="contained" 
                        color="primary"
                        style={{ borderColor: "blue", boxShadow: "blue" }} 
                        onClick={(e) => navigate(`/aggiornaUtente/${params.row.id}`)}>
                    {t("bottoni.update")}
                    </Button>
                    {/* Condizione per mostrare il bottone Cancel solo agli admin */}
                    {
                        userStore.role === 'ADMIN' && (
                        <Button
                            variant="contained"
                            color="error"
                            style={{ margin: "10px" }}
                            onClick={() => deleteUser(params.row.id)}>
                        {t("bottoni.delete")}
                        </Button>
                    )}
                <ToastContainer />
                </div>
            )
        }
    ];

    //generazione tabella contenente gli user con relativi pulsanti linkati per l'add, l'update e la delete
    return (
        <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <br />
            <Box display= "flex" alignItems="center">
                <h2 className="text-left text-dark"> {t("listUserComponent.userList")} </h2>
                <Button variant="contained" color="success" style={{ borderColor: "green", boxShadow: "green", float: "left", margin: "5px 10px 5px 10px" }} onClick={(e) => navigate("/add-user")}> {t("bottoni.adduser")} </Button>
            </Box>

            <Box sx={{ height: 400, width: 'auto' }}>
                <DataGrid
                    rows={user}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                />
            </Box>
        </div >
    )
}

export default ListUserComponent