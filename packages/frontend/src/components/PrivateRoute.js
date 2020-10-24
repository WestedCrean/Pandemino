import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"

import { AuthContext } from "services/auth"

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {

    const { currentUser } = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render={(props) =>
                currentUser ? (
                    <RouteComponent {...props} />
                ) : (
                    <Redirect  to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PrivateRoute
