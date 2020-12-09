import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Fab } from "@material-ui/core"
import { faBaby, faFolderPlus, faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faHandPointRight } from "@fortawesome/free-solid-svg-icons"
import DeleteCourseModal from "../components/DeleteCourseModal"

const AddCourseModal = ({
    courseIdProps,
    type,
    courseNameAlready,
    courseDescriptionAlready,
}) => {
    const [courseName, setCourseName] = useState(null)
    const [courseDescription, setCourseDescription] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirm, setConfirm] = useState(null)
    const [defaultValueName, setDefaultValueName] = useState(null)
    const [defaultValueDescription, setDefaultValueDescription] = useState()

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const { accessToken } = useAuthContext()
    const { user } = useAuthContext()
    const userEmail = user.email

    const addNewCourse = async () => {
        if (validate()) {
            const api = ApiService(accessToken)

            const userReponse = await api.getUserByEmail(userEmail)
            const userId = userReponse.data.id

            const body = {
                name: courseName,
                description: courseDescription,
                userId: userId,
                password: password,
            }
            await api
                .createCourse(body)
                .then(async (response) => {
                    const userCourseBody = {
                        courseId: response.data.id,
                        userId: userId,
                        password: password,
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
    }

    const editCourse = async () => {

        if(password !== null | password !== "" ){
            if(!validateConfirm()){
                return 0;
            }
        }
        {
            const api = ApiService(accessToken)

            const userReponse = await api.getUserByEmail(userEmail)
            const userId = userReponse.data.id

            const courseResponse = await api.getCourseById(courseIdProps)

            const idCourse = courseResponse.data.id

            const body = {
                name: courseName,
                description: courseDescription,
                password: password,
            }

            await api.editCourse(idCourse, body)

            window.alert("Edytowano kurs")
            window.location = "/"
            handleClose()
        }
    }

    const validateConfirm = () => {

        if (password !== confirm) {
            window.alert("Hasla musza się zgadzać")
            return false
        } else {
            return true
        }
    }

    const validatePassword = () => {
        if ((password === null) | (password === "")) {
            window.alert("Podaj haslo")
        } else if (password !== confirm) {
            window.alert("Hasla musza się zgadzać")
        } else {
            return true
        }
    }

    const validate = () => {
        console.log(courseName)

        if ((courseName === null) | (courseName === "")) {
            window.alert("Wpisz nazwe kursu")
        } else if ((courseDescription === null) | (courseDescription === "")) {
            window.alert("Podaj opis kursu")
        } else if (validatePassword()) {
            return true
        }

        return false
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
                            <div>Edytowanie kursu</div>
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
                    <input
                        type="password"
                        className="form-control form-input"
                        id="password"
                        placeholder="Haslo"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className="form-control form-input"
                        id="confirm"
                        placeholder="Powtórz hasło"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
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
                    {type === "edit" ? (
                        <DeleteCourseModal
                            courseId={courseIdProps}
                        ></DeleteCourseModal>
                    ) : null}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddCourseModal
