import React, { Fragment } from "react"
import firebase from "services/firebase"
import {Navbar, ListStreams} from "components"

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
        <Fragment>
            <Navbar></Navbar>
            <ListStreams></ListStreams>
        </Fragment>
    )
}

export default HomePage
