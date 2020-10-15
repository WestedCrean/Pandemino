import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import base from "../database/base.js";
import { AuthContext } from "../login/Auth.js";
import Navbar from "./navbar";


const Layout = () => {


  return (

    <div>
      <Navbar></Navbar>
    </div>

  
  );
};

export default Layout;