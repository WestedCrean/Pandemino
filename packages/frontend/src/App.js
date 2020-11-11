import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { PrivateRoute, Navbar } from "components"
import routes from "config/routes"

function App() {
    return (
        <Router>
            <Navbar></Navbar>
            <Switch>
                {routes
                    .filter((route) => !route.needsAuth)
                    .map((route) => (
                        <Route
                            exact
                            key={route.path}
                            path={route.path}
                            component={route.component}
                        />
                    ))}
                {routes
                    .filter((route) => route.needsAuth)
                    .map((route) => (
                        <PrivateRoute
                            exact
                            key={route.path}
                            path={route.path}
                            component={route.component}
                        />
                    ))}
            </Switch>
        </Router>
    )
}

export default App
