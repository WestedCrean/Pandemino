import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Fab } from "@material-ui/core"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const AddCourseModal = () => {
    const [courseName, setCourseName] = useState(null)
    const [courseDescription, setCourseDescription] = useState(null)
    const [courseLecturer, setCourseLecturer] = useState(null) ////need to be get from user table in future

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const { accessToken } = useAuthContext()

    const addNewCourse = async () => {
        const streamsRepository = ApiService(accessToken).streams
        const body = {
            name: courseName,
            description: courseDescription,
            lecturer: courseLecturer,
        }
        await streamsRepository
            .createCourse(body)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error))

        window.alert("Dodano nowy kurs")
        window.location = "/"
        handleClose()
    }

    return (
        <>
            <Fab color="default" aria-label="add" onClick={handleShow}>
                <FontAwesomeIcon icon={faFolderPlus} size="2x" />
            </Fab>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodawanie nowego kursu</Modal.Title>
                </Modal.Header>
                <Modal.Body>Podaj niezbedne dane</Modal.Body>
                <form>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Nazwa kursu"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        id="desctiption"
                        placeholder="Opis kursu"
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        id="lecturer"
                        placeholder="Wykladowca"
                        value={courseLecturer}
                        onChange={(e) => setCourseLecturer(e.target.value)}
                    />
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button
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

export default AddCourseModal
