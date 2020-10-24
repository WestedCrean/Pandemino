import React, { Fragment } from "react"
import firebase from "services/firebase"
import ListStreams from "components/ListStreams"
import Navbar from "components/navbar"

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
