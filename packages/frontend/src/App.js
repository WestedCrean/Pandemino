import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import { AuthProvider } from "services/auth"

import { PrivateRoute } from "components"
import { HomePage, Login, SignUp } from "pages"

function App() {
    return (
        <AuthProvider>
            <Router>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </Router>
        </AuthProvider>
    )
}

export default App
