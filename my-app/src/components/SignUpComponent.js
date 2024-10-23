import React, { useState } from 'react'
import UserServiceFE from '../services/UserServiceFE'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';

const SignUpComponent = () => {

    const navigate = useNavigate();
    const [identificativo, ] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const { t } = useTranslation();

    //Update dell'utente
  const signUp = async (e) => {
    e.preventDefault();
    const user = { identificativo, email, password, role };
    try { 
        await UserServiceFE.signUp(user);
        navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <br /> <br />
      <div className="contaniner">
        <div className="row justify-content-center align-items-center" style={{ height: "75vh" }}>
          <div className="card col-md-3">
          <h2 className="text-center"> {t("signUpComponent.registrationUser")} </h2>
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
                <Button variant="contained" color="success" style={{ backgroundColor: "#1976D2", borderColor: "blue", float: "left", width: "100px" }} onClick={(e) => signUp(e)}> {t("bottoni.register")} </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default SignUpComponent