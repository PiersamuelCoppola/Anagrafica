import React, { useState, useEffect } from 'react'
import UserServiceFE from '../services/UserServiceFE'
import { useNavigate, useParams, Link } from 'react-router-dom'

const AddUserComponent = () => {

  const [identificativo, setIdentificativo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate();
  const { id } = useParams();

  //Salvataggio dell'utente
  const saveUser = (e) => {
    e.preventDefault();

    const user = { email, password, role }
    UserServiceFE.createUser(user).then((response) => {

      console.log(response.data)

      navigate('/home');

    }).catch(error => {
      console.log(error)
    })
  }

  //Update dell'utente
  const update = (e) => {
    e.preventDefault();

    const user = { identificativo, email, password, role }
    UserServiceFE.updateUser(user).then((response) => {

      console.log(response.data)

      navigate('/home');

    }).catch(error => {
      console.log(error)
    })
  }

  //realizzazione della funzione per il recupero dei dati di un utente per visualizzarli nel form di updateUser
  useEffect(() => {

    UserServiceFE.getUserById(id).then((response) => {
      setIdentificativo(response.data.id)
      setEmail(response.data.email)
      console.log(response.data.email)
      setPassword(response.data.password)
      setRole(response.data.role)
    }).catch(error => {
      console.log(error)
    })

    return () => {

    }
  }, [])

  //modifica del titolo del form in base ad un controllo delle presenza o meno di un id
  const title = () => {
    if (id) {
      console.log(id)
      return <h2 className="text-center"> Update User </h2>
    }
    else {
      return <h2 className="text-center"> Add User </h2>
    }
  }
  //realizzazione di un bottone per l'update o per l'add do un user in base al controllo dell'id come prima per il titolo
  const updateORadd = () => {
    if (id) {
      console.log(id)
      return <button className="btn btn-succes btn-primary" onClick={(e) => update(e)}> Update </button>

    }
    else {
      return <button className="btn btn-succes btn-primary" onClick={(e) => saveUser(e)}> Add </button>

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
                  <label className="form-label"> Role :</label>
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
                  <Link to="/home" className="btn btn-danger"> Cancel </Link>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AddUserComponent