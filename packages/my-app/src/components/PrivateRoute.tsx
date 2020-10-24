import React, { ReactChild, useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "login/Auth"

const PrivateRoute = ({ component: RouteComponent, ...rest }) : ReactChild => {
    const { currentUser } = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
}

export default PrivateRoute
