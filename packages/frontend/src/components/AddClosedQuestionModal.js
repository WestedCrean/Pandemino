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
    const [multiple , setMultiple] = useState(false)
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
                <Modal.Body>Podaj treść i ilość możliwych wariantów odpowiedzi</Modal.Body>
                <form className="p-3">
                    <div>
                        <input type="text" id={`question`} name="question"/>
                        <label for="question">Pytanie  </label>
                        <input type="radio" name="multiple" onChange={e => setMultiple(e.target.value)}/>
                        <label for="multiple">Wielokrotnego wyboru? </label><br></br>
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
                            <input type="text" id={`answer${i}`} name={`answer${i}`}/>
                            <label>Odpowiedz nr {i}</label>
                            {multiple == false ? 
                            <div>
                                <input type="radio" name="isTrue" value={`isTrue${i}`}/>
                                <label>Poprawna? </label><br></br>
                            </div>
                             : 
                            <div>
                                <input type="checkbox" name="isTrue" value={`isTrue${i}`}/>
                                <label>Poprawna? </label><br></br>
                            </div>}
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
