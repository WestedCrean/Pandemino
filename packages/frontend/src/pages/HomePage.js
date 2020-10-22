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

<<<<<<< HEAD
    return <Layout />
=======
    return (
        <Fragment>
            <Navbar></Navbar>
            <ListStreams></ListStreams>
        </Fragment>
    )
>>>>>>> aa7749d0c3be9d100e8ad027499a36db03f7a29e
}

export default HomePage
