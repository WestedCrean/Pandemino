import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import { AuthProvider } from "services/auth"

import { PrivateRoute } from "components"
import { HomePage, Login, SignUp } from "pages"

function App() {
    return (
        <Router>
        <AuthProvider>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
        </AuthProvider>
        </Router>
    )
}

export default App
