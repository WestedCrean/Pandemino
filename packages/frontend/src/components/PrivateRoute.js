import React from "react"
import { Route, Redirect } from "react-router-dom"

import { useAuthContext } from "services/auth"

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {

    const { user } = useAuthContext()

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <RouteComponent {...props} />
                ) : (
                    <Redirect  to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PrivateRoute
