import React from "react"
import { Route, Redirect } from "react-router-dom"

import { useAuthContext } from "services/auth"

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {

    const { user, loggedIn, accessToken } = useAuthContext()

    console.log({user, loggedIn, accessToken})

    return (
        <Route
            {...rest}
            render={(props) =>
                loggedIn ? (
                    <RouteComponent {...props} />
                ) : (
                    <Redirect  to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PrivateRoute
