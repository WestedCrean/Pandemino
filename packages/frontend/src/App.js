  
import React, { Component }  from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './login/PrivateRoute';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import {AuthProvider} from './login/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={HomePage}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;