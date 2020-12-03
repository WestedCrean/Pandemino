import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Fab } from "@material-ui/core"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PasswordModal = (props) => {
    const [password, setPassword] = useState(null)

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)



    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Dolacz do kursu
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Podaj haslo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Podaj haslo</Modal.Body>
                <form>
                    <input
                        type="text"
                        className="form-control form-input"
                        id="name"
                        placeholder="Podaj haslo"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={() => {props.joinCourse(props.courseId, password); console.log(password)}}
                    >
                        Dodaj
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PasswordModal
