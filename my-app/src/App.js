import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import ListUserComponent from './components/ListUserComponent';
import FooterComponent from './components/FooterComponent';
import AddUserComponent from './components/AddUserComponent';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import PrivateRoute from './redux/PrivateRoute';
function App() {
  return (
      <Router>
        <HeaderComponent />
        <Routes>
          <Route exact path="/" element={[]}></Route>
          <Route exact path="/registration" element={<SignUpComponent />}></Route>
          <Route exact path="/login" element={<LoginComponent />} />
          {/* Route protette */}         
          <Route exact path="/home" element={<PrivateRoute><ListUserComponent /></PrivateRoute>} />
          <Route exact path="/add-user" element={<PrivateRoute><AddUserComponent /></PrivateRoute>} />
          <Route exact path="/aggiornaUtente/:id" element={<PrivateRoute><AddUserComponent /></PrivateRoute>} />
        </Routes>
        <FooterComponent />
      </Router>
  );
}

export default App;
