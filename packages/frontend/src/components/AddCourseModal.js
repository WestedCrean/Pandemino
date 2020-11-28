import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Fab } from "@material-ui/core"
import { faBaby, faFolderPlus, faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faHandPointRight } from "@fortawesome/free-solid-svg-icons"

const AddCourseModal = ({
    courseIdProps,
    type,
    courseNameAlready,
    courseDescriptionAlready,
}) => {
    const [courseName, setCourseName] = useState(null)
    const [courseDescription, setCourseDescription] = useState(null)
    const [defaultValueName, setDefaultValueName] = useState(null)
    const [defaultValueDescription, setDefaultValueDescription] = useState()

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const { accessToken } = useAuthContext()
    const { user } = useAuthContext()
    const userEmail = user.email

    console.log(`NAZWA: ${courseNameAlready}`)
    console.log(`OPIS : ${courseDescriptionAlready}`)

    const addNewCourse = async () => {
        const api = ApiService(accessToken)

        const userReponse = await api.getUserByEmail(userEmail)
        const userId = userReponse.data.id

        const body = {
            name: courseName,
            description: courseDescription,
            userId: userId,
        }
        await api
            .createCourse(body)
            .then(async (response) => {
                const userCourseBody = {
                    courseId: response.data.id,
                    userId: userId,
                }
                await api
                    .addUserCourse(userCourseBody)
                    .then(response)
                    .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))

        window.alert("Dodano nowy kurs")
        window.location = "/"
        handleClose()
    }
    const editCourse = async () => {
        const api = ApiService(accessToken)

        const userReponse = await api.getUserByEmail(userEmail)
        const userId = userReponse.data.id

        const courseResponse = await api.getCourseById(courseIdProps)

        const idCourse = courseResponse.data.id

        const body = {
            name: courseName,
            description: courseDescription,
        }
        console.log(idCourse)
        console.log(body)
        await api.editCourse(idCourse, body)

        window.alert("Edytowano nowy kurs")
        window.location = "/"
        handleClose()
    }

    return (
        <>
            {type === "edit" ? (
                <Button className="ml-2" variant="light" onClick={handleShow}>
                    <FontAwesomeIcon size="lg" icon={faCog}></FontAwesomeIcon>
                </Button>
            ) : (
                <Fab
                    className="awsome-button"
                    color="default"
                    aria-label="add"
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faFolderPlus} size="2x" />
                </Fab>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {type === "edit" ? (
                            <div>Edytowanie nowego kursu</div>
                        ) : (
                            <div>Dodawanie nowego kursu</div>
                        )}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Podaj niezbedne dane</Modal.Body>
                <form className="p-3">
                    <input
                        type="text"
                        className="form-control form-input"
                        id="name"
                        placeholder="Nazwa kursu"
                        value={courseName}
                        defaultValue={courseNameAlready}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                    <textarea
                        type="text"
                        className="form-control form-input "
                        id="desctiption"
                        placeholder="Opis kursu"
                        defaultValue={courseDescriptionAlready}
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                    />
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    {type === "edit" ? (
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={editCourse}
                        >
                            Edit
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={addNewCourse}
                        >
                            Dodaj
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddCourseModal
