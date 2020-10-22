import React, { Fragment } from "react"
import base from "database/base"

import ListStreams from "components/listOfStreams"
import Navbar from "components/navbar"

const HomePage = () => {
    const onSubmitForm = async () => {
        try {
            base.auth().signOut()
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
