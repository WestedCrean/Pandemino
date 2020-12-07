import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Fab } from "@material-ui/core"
import { faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DeleteLectureModal = (props) => {
    const lectureId = props.lectureId

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const { accessToken } = useAuthContext()
    const { user } = useAuthContext()
    const userEmail = user.email

    const deleteLectureFunc = async () => {
        const api = ApiService(accessToken)
        await api.deleteLecture(lectureId)

        window.alert("Usunieto wykład")
        window.location = "/"
        handleClose()
    }

    return (
        <>
            <Button
                className="deleteCourse ml-3"
                variant="danger"
                size="sm"
                onClick={handleShow}
            >
                <FontAwesomeIcon size="sm" icon={faMinus}></FontAwesomeIcon>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Usuwanie wykładu</Modal.Title>
                </Modal.Header>
                <form className="p-3">
                    <label>Jestes pewien ze chcsz usunac wykład?</label>
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Nie
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={deleteLectureFunc}
                    >
                        Tak
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteLectureModal
