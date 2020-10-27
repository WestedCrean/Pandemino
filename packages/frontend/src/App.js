import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import { AuthProvider } from "services/auth"

import { PrivateRoute } from "components"
import { HomePage, Login, SignUp } from "pages"
import ListLectures from "components/ListLectures";


function App() {
    return (
        <AuthProvider>
            <Router>
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute exact path="/lecture" component={ListLectures} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </Router>
        </AuthProvider>
    )
}

export default App
