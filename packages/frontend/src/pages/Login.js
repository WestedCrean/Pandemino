import React, { useCallback } from "react"
import { withRouter, Redirect } from "react-router"
import { authMethods } from "services/auth"

import { useAuthContext } from 'services/auth'
import FancyWave from "components/FancyWave"


const Login = ({ history, location }) => {
    const { accessToken } = useAuthContext()
    let referrer
    try {
        const {
            state: {
                referrer: { pathname },
            },
        } = location
        referrer = pathname || "/"
    } catch (e) {
        referrer = "/"
    }

    if (accessToken) {
        return <Redirect to={referrer} />
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        const { email, password } = event.target.elements
        await authMethods.signIn(email.value, password.value)
        history.push(referrer)
    }

    ///FIXME
    return (
        <div id="login" className="login-container">
            <FancyWave></FancyWave> 
            <h3 className="text-center text-black pt-5">Pandemino</h3>
            <div className="">
                <div
                    id="login-row"
                    className="row justify-content-center align-items-center"
                >
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form
                                id="login-form"
                                className="form"
                                onSubmit={handleLogin}
                            >
                                <h3 className="text-center text-info">Login</h3>
                                <div className="form-group">
                                    <label
                                        htmlFor="email"
                                        className="text-info"
                                    >
                                        Email:
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="password"
                                        className="text-info"
                                    >
                                        Haslo:
                                    </label>
                                    <br />
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="submit"
                                        name="submit"
                                        className="btn btn-info btn-md cy-submit"
                                        value="submit"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
