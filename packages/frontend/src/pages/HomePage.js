import React from "react"
import base from "database/base"
import Layout from "components/layout"

const HomePage = () => {
    const onSubmitForm = async () => {
        try {
            base.auth().signOut()
            window.location = "/"
        } catch (error) {
            console.error(error.message)
        }
    }

    return <Layout></Layout>
}

export default HomePage
