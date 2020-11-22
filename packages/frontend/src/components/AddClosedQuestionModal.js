import React, { useEffect, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Fab } from "@material-ui/core"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faHandPointRight } from "@fortawesome/free-solid-svg-icons"

const AddClosedQuestionModal = () => {

    const [questionCount, setQuestionCount] = useState(1)
    const [list, setList] = useState([])

    const [show, setShow] = useState(false)
    const [showSecondStep, setShowSecondStep] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowSecondStep = () => setShowSecondStep(true)
    const handleCloseSecondStep = () => setShowSecondStep(false)


    const addNewQuestion = async () => {
        //const api = ApiService(accessToken)

    }

    const moveToStepTwo = () => {

        handleClose()
        let list = []
        for(var i = 0; i < questionCount; i++){
            list.push(i)
        }

        setList(list)

        handleShowSecondStep()
    }

    useEffect(() => {

    },[showSecondStep]);

    return (
        <>
            <Fab color="default" aria-label="add" onClick={handleShow}>
                <FontAwesomeIcon icon={faFolderPlus} size="2x" />
            </Fab>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>Dodawanie nowego pytania</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Podaj ile pytan chcesz dodac</Modal.Body>
                <form className="p-3">
                    <div>
                        <input type="number" id="question" name="question" onChange={e => setQuestionCount(e.target.value)}/>
                        <label for="question">Ilość pytań</label>
                    </div>
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={()=>moveToStepTwo()}
                    >
                        Przejdz dalej
                    </Button>
                </Modal.Footer>
            </Modal>
  

            <Modal show={showSecondStep} onHide={handleCloseSecondStep}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>Dodawanie nowego pytania</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Podaj niezbedne dane</Modal.Body>
                <form className="p-3">
                    {list.map((element, i) => (
                        <div>
                            <input type="text" id={`question${5}`} name="question"/>
                            <label for="question">Question</label>
                        </div>
                    ))}
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSecondStep}>
                        Anuluj
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={null}
                    >
                        Dodaj
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddClosedQuestionModal
