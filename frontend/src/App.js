// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage/Home';
import Login from './pages/loginPage/Login';
import PrivateRoute from './utlis/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/registerPage/Register';
import NavBar from './components/NavBar/NavBar';
import Advisor from './pages/advisor/Advisor';
import Evalutor from './pages/evalutor/Evalutor';

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <div className='mb-[4.5rem]'>
        <NavBar/>
      </div>
        <Routes>
                
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<PrivateRoute Component={Home} /> } />
                <Route path="/advisor" element={<PrivateRoute Component={Advisor} /> } />
                <Route path="/evalutor" element={<PrivateRoute Component={Evalutor} /> } />

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
