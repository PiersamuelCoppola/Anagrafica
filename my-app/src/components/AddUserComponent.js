import React, { useState, useEffect } from 'react'
import UserServiceFE from '../services/UserServiceFE'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';

const AddUserComponent = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [identificativo, setIdentificativo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const auth = useSelector((state) => state.auth.isLoggedIn)
  const token = useSelector((state) => state.auth.token)

  const { t } = useTranslation();

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);

  //Salvataggio dell'utente
  const saveUser = async (e) => {
    e.preventDefault();
    const user = { email, password, role }
    try {
      if (token) {
        await UserServiceFE.createUser(user, token);
        navigate('/home');
      } else {
        console.log("Token non presente");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Update dell'utente
  const update = async (e) => {
    e.preventDefault();
    const user = { identificativo, email, password, role };
    try {
      if (token) {
        await UserServiceFE.updateUser(user, token);
        navigate('/home');
      } else {
        console.log("Token non presente");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //realizzazione della funzione per il recupero dei dati di un utente per visualizzarli nel form di updateUser
  useEffect(() => {
    if (id) {
      UserServiceFE.getUserById(id, token).then((response) => {
        setIdentificativo(response.data.id);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setRole(response.data.role);
      }).catch(error => {
        console.log(error);
      });
    }
  }, [token, id]);

  //modifica del titolo del form in base ad un controllo delle presenza o meno di un id
  const title = () => {
    if (id) {
      console.log(id)
      return <h2 className="text-center"> {t("bottoni.update")} </h2>
    }
    else {
      return <h2 className="text-center"> {t("bottoni.adduser")} </h2>
    }
  }
  //realizzazione di un bottone per l'update o per l'add do un user in base al controllo dell'id come prima per il titolo
  const updateORadd = () => {
    if (id) {
      console.log(id)
      return <Button variant="contained" color="primary" style={{ borderColor: "blue", boxShadow: "blue"}} onClick={(e) => update(e)}> {t("bottoni.update")} </Button>
    }
    else {
      return <Button variant="contained" color="primary" style={{ borderColor: "blue", boxShadow: "blue" }} onClick={(e) => saveUser(e)}> {t("bottoni.adduser")} </Button>
    }
  }

  //formazione del form per l'inserimento dell'email, della password e del ruolo
  return (
    <div>
      <br /> <br />
      <div className="contaniner">
        <div className="row justify-content-center align-items-center" style={{ height: "75vh" }}>
          <div className="card col-md-3">
            {
              title()
            }
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

                <div className="form-group mb-2">
                  <label className="form-label"> {t("listUserComponent.role")} :</label>
                  <input
                    type="text"
                    placeholder="Enter role"
                    name="role"
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                  </input>
                </div>
                {
                  updateORadd()
                }
                  <Button variant="contained" color="error" style={{ borderColor: "red", boxShadow: "red", margin: "10px"}} onClick={(e) => navigate("/home")}> {t("bottoni.cancel")} </Button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AddUserComponent