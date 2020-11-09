import React, { Fragment } from "react"
import firebase from "services/firebase"
import { Navbar, ListCourses } from "components"
import GridHome from "../components/GridHome"

const HomePage = () => {
    const onSubmitForm = async () => {
        try {
            firebase.auth().signOut()
            window.location = "/"
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <GridHome></GridHome>
    )
}

export default HomePage
