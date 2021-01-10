import React from "react"
import { Modal, Button, Form, FormGroup } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { useUserInfo } from "../hooks/user"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faVideo } from "@fortawesome/free-solid-svg-icons"

const ToggleLiveBtn = ({
    availableLectures,
    handleToggleLive,
    currentState,
}) => {
    const [chosenLectureId, setChosenLecture] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)

    const toggleLive = () => {
        if (!currentState) {
            toggleModal()
        } else {
            handleToggleLive(null)
        }
    }

    const handleSelectChange = (e) => {
        const { value } = e.target
        console.log({ value })
        setChosenLecture(value)
    }

    const handleSubmit = () => {
        handleToggleLive(chosenLectureId)
        toggleModal()
    }

    const toggleModal = () => {
        showModal ? setShowModal(false) : setShowModal(true)
    }
    return (
        <>
            <div className="start-live-btn">
                <Button variant="light" onClick={toggleLive}>
                    <FontAwesomeIcon
                        className="recording mr-1"
                        size="sm"
                        icon={faVideo}
                    ></FontAwesomeIcon>
                    {currentState ? "Zakończ Live" : "Rozpocznij Live"}
                </Button>
            </div>
            <Modal show={showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>
                            Wybierz wykład który chcesz przeprowadzić na żywo
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Anuluj
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={
                            chosenLectureId === null || chosenLectureId === ""
                        }
                    >
                        Rozpocznij wykład na żywo
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ToggleLiveBtn
