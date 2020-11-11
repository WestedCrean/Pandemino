import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuthContext, useAuthState } from "services/auth"

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
    const { accessToken } = useAuthState()

    return accessToken ? (<Route path={props.path} exact={props.exact} component={props.component} />) :
        (<Redirect to={{ pathname: '/login', state: { referrer: props.location } }} />);

}

export default PrivateRoute
