import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import base from "../database/base.js";
import { AuthContext } from "../login/Auth";
import '../styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await base
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]

  );

  const {currentUser} = useContext(AuthContext);

  if (currentUser) {
    console.log(currentUser.email);
    return <Redirect to="/" />;
     
  }


  // const showUser = () => {
  //   console.log(`#APP: ${currentUser}`);
  // };

  return (
  

      <div id="login">
          <h3 class="text-center text-black pt-5">Pandemino</h3>
          <div class="container">
              <div id="login-row" class="row justify-content-center align-items-center">
                  <div id="login-column" class="col-md-6">
                      <div id="login-box" class="col-md-12">
                          <form id="login-form" class="form" onSubmit={handleLogin}>
                              <h3 class="text-center text-info">Login</h3>
                              <div class="form-group">
                                  <label for="email" class="text-info">Email:</label><br></br>
                                  <input type="text" name="email" id="email" class="form-control"></input>
                              </div>
                              <div class="form-group">
                                  <label for="password" class="text-info">Haslo:</label><br></br>
                                  <input type="password" name="password" id="password" class="form-control"></input>
                              </div>
                              <div class="form-group">
                                  <input type="submit" name="submit" class="btn btn-info btn-md" value="submit"></input>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    
    
  );
}


export default withRouter(Login);