import React, { Fragment } from "react"
import base from "database"

import { useHistory } from "react-router-dom"
import ListStreams from "components/ListStreams"
import Navbar from "components/Navbar"

const HomePage = () => {
    const history = useHistory()

    const onSubmitForm = async () => {
        try {
            base.auth().signOut()
            history.push("/")
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
