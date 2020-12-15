import React from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "services/auth"
import { useHistory } from "react-router-dom"
import logo from "../styles/logo/logo.png"

const Navbar = () => {
    const { user, toggleLoggedOut } = useAuthContext()

    const logout = () => {
        toggleLoggedOut()
        window.location = "/"
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul className="navbar-nav mr-auto">
                    <Link className="navbar-brand ml-4" to="/">
                        <img src={logo}></img>
                    </Link>
                </ul>
            </div>
            <div className="mx-auto order-0">
                <a className="navbar-brand mx-auto" href="#" />
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target=".dual-collapse2"
                >
                    <span className="navbar-toggler-icon" />
                </button>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                {user && (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a
                                className="nav-link my-2 my-lg-0 cy-wszystkie"
                                href="/listCourses"
                            >
                                Wszystkie kursy
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link my-2 my-lg-0"
                                href="/userPanel"
                            >
                                {user.email}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link my-2 my-lg-0"
                                href="#"
                                onClick={() => logout()}
                            >
                                Sign Out{" "}
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar
