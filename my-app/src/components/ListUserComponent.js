import React, { useState, useEffect } from 'react'
import UserServiceFE from '../services/UserServiceFE'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const ListUserComponent = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState([])
    const auth = useSelector((state) => state.auth.isLoggedIn)
    const token = useSelector((state) => state.auth.token)
    const userStore = useSelector((state) => state.auth.user)



    //effetto da renderizzare quando si renderizza la pagina
    useEffect(() => {
        //chiamata al service per eseguire la GetAllUser
        UserServiceFE.getAllUser(token).then(response => {
            setUser(response.data)
            console.log(response.data)
        }).catch(error => {
            console.log(error);
        })

    }, [token])

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

    useEffect(() => {
        // Se l'utente non è autenticato, reindirizza alla pagina di login
        if (!auth) {
            navigate('/login');
            return;
        }
        // Carica gli utenti solo se l'utente è autenticato
        loadUsers();
    }, [auth, navigate, loadUsers]);

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

    //generazione tabella contenente gli user con relativi pulsanti linkati per l'add, l'update e la delete
    return (
        <div className="container-fluid">
            <div>
                <h2 className="text-left text-dark"> User List </h2>
                <Link to="/add-user" className="btn btn-right btn-success" style={{ margin: "1%", float: "right" }}> Add User </Link>
            </div>
            <table className="table table-bordered table-striped table-dark">
                <thead>
                    <tr>
                        <th> Id </th>
                        <th> Email </th>
                        <th> Password </th>
                        <th> Role </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map(
                            user =>
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Link className="btn btn-primary" to={`/aggiornaUtente/${user.id}`}> Update </Link>

                                        {/* Condizione per mostrare il bottone Cancel solo agli admin */}
                                        {
                                            userStore.role === 'ADMIN' && (
                                                <Link className="btn btn-danger" onClick={() => deleteUser(user.id)}> Delete </Link>
                                            )}
                                        <ToastContainer />
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div >
    )
}

export default ListUserComponent