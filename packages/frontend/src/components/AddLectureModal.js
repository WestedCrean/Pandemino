import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Fab } from "@material-ui/core"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AddLectureModal = (props) => {
    const [lecturerName, setLectureName] = useState(null)
    const [lectureDescription, setLectureDescription] = useState(null)

    const courseId = props.courseId
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const { accessToken } = useAuthContext()

    const addNewCourse = async () => {
        if (validate()) {
            const api = ApiService(accessToken)
            const body = {
                name: lecturerName,
                description: lectureDescription,
                course: courseId,
            }
            await api
                .createStream(body)
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error))

            window.alert("Dodano nowy wyklad")
            window.location = `/course/${courseId}`
            handleClose()
        }
    }

    const validate = () => {
        if ((lecturerName === null) | (lecturerName === "")) {
            window.alert("Wpisz nazwe wykładu")
        } else if (
            (lectureDescription === null) |
            (lectureDescription === "")
        ) {
            window.alert("Podaj opis wykładu")
        } else {
            return true
        }

        return false
    }

    return (
        <>
            <Button
                className="awsome-button cy-dodaj-wyklad"
                color="default"
                aria-label="add"
                onClick={handleShow}
            >
                <FontAwesomeIcon icon={faPlus} size="2x" />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodawanie nowego wykladu</Modal.Title>
                </Modal.Header>
                <Modal.Body>Podaj niezbedne dane</Modal.Body>
                <form>
                    <input
                        type="text"
                        className="form-control form-input cy-nazwa"
                        id="name"
                        placeholder="Nazwa wykladu"
                        value={lecturerName}
                        onChange={(e) => setLectureName(e.target.value)}
                    />
                    <textarea
                        type="text"
                        className="form-control form-input cy-opis"
                        id="desctiption"
                        placeholder="Opis wykladu"
                        value={lectureDescription}
                        onChange={(e) => setLectureDescription(e.target.value)}
                    />
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button
                        className="cy-form-dodajwyklad"
                        type="submit"
                        variant="primary"
                        onClick={addNewCourse}
                    >
                        Dodaj
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddLectureModal
