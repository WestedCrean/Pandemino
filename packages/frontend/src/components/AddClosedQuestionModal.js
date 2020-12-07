import React, { useEffect, useState, useRef } from "react"
import { Modal, Button } from "react-bootstrap"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Fab } from "@material-ui/core"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faHandPointRight } from "@fortawesome/free-solid-svg-icons"

const AddClosedQuestionModal = (props) => {
    const { accessToken } = useAuthContext()

    const quizId = props.quizId
    ///form data
    const [question, setQuestion] = useState(null)
    const [questionCount, setQuestionCount] = useState(1)
    const [multiple, setMultiple] = useState(false)


    const [anwserList, setAnswerList] = useState([])
    const [checkInputs, setCheckInputs] = useState([])

    const [elementList, setElementList] = useState([])

    


    const [closedQuestion, setClosedQuestion] = useState()

    const [show, setShow] = useState(false)
    const [showSecondStep, setShowSecondStep] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleShowSecondStep = () => setShowSecondStep(true)
    const handleCloseSecondStep = () => setShowSecondStep(false)

    const addNewQuestion = async () => {

        if(validateStepTwo()){


            const api = ApiService(accessToken)
            const body = {
                quizId: quizId,
                multiple: multiple,
                content: question,
                isOpen: false,
            }


            try {
                let response = await api.addQuestion(body)
                addVariants(response.data.id)
                props.handleChangeInQuiz()
                handleCloseSecondStep()
                setMultiple(false)
            } catch (error) {
                console.error({ error })
            }
        }
    }

    const addVariants = async (id) => {


            const api = ApiService(accessToken)

            for (let index = 0; index < anwserList.length; index++) {
                const body = {
                    closedQuestionId: id,
                    isTrue: checkInputs[index],
                    content: anwserList[index],
                }
    

                try {
                    let response = await api.addVariant(body)
                } catch (error) {
                    console.error({ error })
                }
            }
        //handleCloseSecondStep()
    }

    
    const validateStepTwo = () => {

        for(let i = 0; i < anwserList.length; i++){

            if(anwserList[i] === "" | anwserList[i] === "0"){
                window.alert(`Podaj treść odpowiedzi ${i}`)
                return false;

            }
        }
        if(!checkInputs.includes(true)){
            window.alert("Przynajmniej jedna odpowiedź musi być prawidłowa")
            return false;
        }

        return true
    }

    const moveToStepTwo = () => {
        ///VALIDATE STEP ONE
        if(question === null | question === ""){
            window.alert("Podaj tresc pytania")
        }else if(questionCount <= 1){
            window.alert("Pytanie musi mieć przynajmniej dwa warianty odpowiedzi")
        }else{
            handleClose()
            let elementListTemp = []
            let anwserListTemp = []
            let checkInputsTemp = []
    
            for (var i = 0; i < questionCount; i++) {
                elementListTemp.push(i)
                anwserListTemp.push("0")
                checkInputsTemp.push(false)
            }
    
            setElementList(elementListTemp)
            setAnswerList(anwserListTemp)
            setCheckInputs(checkInputsTemp)
    
            handleShowSecondStep()
        }
    }

    const handleMultipleFormInput = (e, i) => {
        let list = anwserList
        list[i] = e
        setAnswerList(list)

    }

    const handleMultipleFormChecks = (e, i) => {
        let list = checkInputs
        list[i] = e
        setCheckInputs(checkInputs)

    }

    const handleMultipleFormRadio = (e, i) => {
        let list = checkInputs
        for (let i = 0; i < checkInputs.length; i++) {
            list[i] = false
        }
        list[i] = e
        setCheckInputs(checkInputs)


    }

    useEffect(() => {}, [showSecondStep])

    return (
        <>
            <Fab size="small" color="default" aria-label="add" onClick={handleShow}>
                <FontAwesomeIcon icon={faFolderPlus} size="1.5x" />
            </Fab>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>Dodawanie nowego pytania</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Podaj treść i ilość możliwych wariantów odpowiedzi
                </Modal.Body>
                <form className="p-3">
                    <div>
                        <input
                            type="text"
                            id={`question`}
                            name="question"
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <label for="question">Pytanie </label>
                        <input
                            type="checkbox"
                            name="multiple"
                            onChange={(e) => setMultiple(e.target.checked)}
                        />
                        <label for="multiple">Wielokrotnego wyboru? </label>
                        <br></br>
                        <input
                            type="number"
                            id="question"
                            name="question"
                            onChange={(e) => setQuestionCount(e.target.value)}
                        />
                        <label for="question">Ilość odpowiedzi</label>
                    </div>
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={() => moveToStepTwo()}
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
                    {elementList.map((i) => (
                        <div>
                            <input
                                type="text"
                                id={`answer${i}`}
                                name={`answer${i}`}
                                onChange={(e) =>
                                    handleMultipleFormInput(e.target.value, i)
                                }
                            />
                            <label>Odpowiedz nr {i}</label>
                            {multiple == false ? (
                                <div>
                                    <input
                                        type="radio"
                                        name="isTrue"
                                        onChange={(e) =>
                                            handleMultipleFormRadio(
                                                e.target.checked,
                                                i
                                            )
                                        }
                                    />
                                    <label>Poprawna? </label>
                                    <br></br>
                                </div>
                            ) : (
                                <div>
                                    <input
                                        type="checkbox"
                                        name="isTrue"
                                        onChange={(e) =>
                                            handleMultipleFormChecks(
                                                e.target.checked,
                                                i
                                            )
                                        }
                                    />
                                    <label>Poprawna? </label>
                                    <br></br>
                                </div>
                            )}
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
                        onClick={() => addNewQuestion()}
                    >
                        Dodaj
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddClosedQuestionModal
