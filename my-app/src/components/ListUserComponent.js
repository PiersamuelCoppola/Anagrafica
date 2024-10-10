import React, { useState, useEffect } from 'react'
import UserServiceFE from '../services/UserServiceFE'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ListUserComponent = () => {

    const [user, setUser] = useState([])

    //effetto da renderizzare quando si renderizza la pagina
    useEffect(() => {
        //chiamata al service per eseguire la GetAllUser
        UserServiceFE.getAllUser().then(response => {
            setUser(response.data)
            console.log(response.data)
        }).catch(error => {
            console.log(error);
        })

    }, [])

    //effetto da renderizzare quando si renderizza la pagina
    useEffect(() => {
        loadUsers()
    }, [/*parametro*/])

    //funzione definita per ricaricare in automatico la pagina quando viene effettuata la cancellazione
    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/user/getAllUser")
        //console.log(result.data); stampa i dati recuperati dal backend sulla console del browser
        setUser(result.data); //setto la variabile users = ai dati recuperati dal backend
    }

    //cancellazione di un user
    const deleteUser = async (id) => {
        let AuthStr="";
        let token = sessionStorage.getItem("ACCESSToken");
        if(token===null){
            //visualizzo il toast se ad esempio cancello il token dalla sessione e voglio eseguire la delete
            toast.error("Token non presente, operazione non eseguibile");
        }else{
            AuthStr = 'Bearer '.concat(token);
        }
        try {
            await axios.delete(`http://localhost:8080/user/cancellaUser/${id}`, {headers: { Authorization: AuthStr}})
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
            <br /> <br />
            <div>
                <h2 className="text-center text-dark"> User List </h2>
            </div>
            <Link to="/add-user" className="btn btn-success" style={{ margin: "1%" }}> Add User </Link>
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
                                        {sessionStorage.getItem("role") === 'ADMIN' && (
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