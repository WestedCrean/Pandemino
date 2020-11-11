import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuthContext } from "services/auth"

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
    const { accessToken } = useAuthContext()

    return accessToken !== null ? (<RouteComponent {...props} />) :
        (<Redirect to={{ pathname: '/login', state: { referrer: props.location } }} />);

}

export default PrivateRoute
