import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; import HeaderComponent from './components/HeaderComponent';
import ListUserComponent from './components/ListUserComponent';
import FooterComponent from './components/FooterComponent';
import AddUserComponent from './components/AddUserComponent';
import LoginComponent from './components/LoginComponent';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <HeaderComponent />
          <Routes>
            <Route exact path="/login" element={[<LoginComponent />]}></Route>
            <Route element={<PrivateRoute />}></Route>
              <Route exact path="/home" element={[<ListUserComponent />]}>
              </Route>
            <Route exact path="/home/add-user" element={[<AddUserComponent />]}></Route>
            <Route exact path="/home/aggiornaUtente/:id" element={[<AddUserComponent />]}></Route>
          </Routes>

          <FooterComponent />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
