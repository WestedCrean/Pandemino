import React from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "services/auth"

const Sidebar = () => {
    const { user, toggleLoggedOut } = useAuthContext()

    return (
        <div class="nav-container">
            <a>Strona Główna</a>
            <a>Wykłady</a>
            <a>Kursy</a>
            <a>Wyloguj</a>
        </div>
    )
}

export default Sidebar
