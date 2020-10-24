import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import PrivateRoute from "components/PrivateRoute"
import HomePage from "pages/HomePage"
import Login from "pages/Login"
import SignUp from "pages/SignUp"
import { AuthProvider } from "context/auth"

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
