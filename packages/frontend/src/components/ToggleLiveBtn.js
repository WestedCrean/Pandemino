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
        toggleModal()
        if (!currentState) {
            const chosenLectureId = 1
            handleToggleLive(chosenLectureId)
        } else {
            handleToggleLive(null)
        }
    }

    const toggleModal = () => {
        showModal ? setShowModal(false) : setShowModal(true)
    }
    return (
        <>
            <div className="start-live-btn">
                <Button variant="light" onClick={toggleModal}>
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
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Custom select</Form.Label>
                            <Form.Control as="select" custom>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
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
                        onClick={toggleLive}
                    >
                        Rozpocznij wykład na żywo
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ToggleLiveBtn
