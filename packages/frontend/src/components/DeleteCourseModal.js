import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Fab } from "@material-ui/core"
import { faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DeleteCourseModal = (props) => {

    const courseId = props.courseId

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const { accessToken } = useAuthContext()
    const { user } = useAuthContext()
    const userEmail = user.email

    const deleteCourse = async () => {
        const api = ApiService(accessToken)
        await api
            .deleteCourse(courseId)

        window.alert("Usunieto kurs")
        window.location = "/"
        handleClose()
    }

    return (
        <>
            <Button className="btn btn-danger" onClick={handleShow}>
                Usun kurs
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Usuwanie kursu</Modal.Title>
                </Modal.Header>
                <form className="p-3">
                    <label>Jestes pewien ze chcsz usunac kurs?</label>
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Nie
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={deleteCourse}
                    >
                        Tak
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteCourseModal
