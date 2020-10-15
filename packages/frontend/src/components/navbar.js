import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import base from "../database/base.js";
import { AuthContext } from "../login/Auth.js";

const Navbar = () => {


  const {currentUser} = useContext(AuthContext);

  return (
 

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
        <a class="navbar-brand ml-4" href="#">Pandemino</a>
        </ul>
    </div>
    <div class="mx-auto order-0">
        <a class="navbar-brand mx-auto" href="#"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
        <li class="nav-item">
             <a class="nav-link my-2 my-lg-0" href="#">{currentUser.email}</a>
        </li>
            <li class="nav-item">
            <a class="nav-link" onClick={() => base.auth().signOut()}>Sign Out <span class="sr-only">(current)</span></a>
            </li>
        </ul>
    </div>
</nav>
    );
};

export default Navbar;