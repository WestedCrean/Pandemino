import React, { useCallback, useContext } from "react"
import { withRouter, Redirect } from "react-router"
import base from "database/base"
import { AuthContext } from "login/Auth"
import Navbar from "components/navbar"

const Layout = () => {
    return (
        <div>
            <Navbar></Navbar>
        </div>
    )
}

export default Layout
