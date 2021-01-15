import React from "react"
import { Modal, Button, Form, FormGroup } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { useToasts } from "react-toast-notifications"
import { useUserInfo } from "../hooks/user"
import FileAdding from "components/FileAdding"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons"

const AddVideoToLecture = ({ availableLectures }) => {
    const { addToast, toastStack } = useToasts()

    const [showModal, setShowModal] = React.useState(false)
    const [chosenLectureId, setChosenLecture] = React.useState(null)
    const videoRef = React.useRef()

    const handleSelectChange = (e) => {
        console.log({ e })
        setChosenLecture(e.target.value)
    }

    const handleFirebaseUpload = () => {
        addToast("Pomyślnie dodano plik z wykładem", { appearance: "success" })
        // add to db
    }

    const toggleModal = (state) => {
        if (state !== true && state !== false) {
            showModal ? setShowModal(false) : setShowModal(true)
        } else {
            setShowModal(state)
        }
    }
    return (
        <>
            <div className="start-live-btn">
                <Button variant="light" onClick={toggleModal}>
                    <FontAwesomeIcon
                        className="upload mr-1"
                        size="sm"
                        icon={faArrowCircleUp}
                    ></FontAwesomeIcon>
                    Dodaj plik z nagraniem do wykładu
                </Button>
            </div>
            <Modal
                show={showModal}
                onHide={() => {
                    toggleModal(false)
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>
                            Wybierz wykład dla którego chcesz dodać plik wideo
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onChange={handleSelectChange}>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Wybrany wykład</Form.Label>
                            <Form.Control as="select" custom>
                                <option value="">Wybierz wykład...</option>
                                {availableLectures.map((lecture) => (
                                    <option
                                        key={lecture.name}
                                        value={lecture.id}
                                    >
                                        {lecture.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    {chosenLectureId && (
                        <FileAdding
                            lectureId={chosenLectureId}
                            handleChange={handleFirebaseUpload}
                            fileIsLecture={true}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddVideoToLecture
