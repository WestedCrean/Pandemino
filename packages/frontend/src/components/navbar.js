import React from "react"
import {Link} from "react-router-dom";
import { useAuthContext } from "services/auth"

const Navbar = () => {
    const { user, toggleLoggedOut } = useAuthContext()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul className="navbar-nav mr-auto">
                    <Link className="navbar-brand ml-4" to="/">
                    Chujowino
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
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link my-2 my-lg-0" href="#">
                            {user.email}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={toggleLoggedOut}
                        >
                            Sign Out <span className="sr-only">(current)</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
