import React, { Fragment, useEffect, useState, useRef } from "react"
import AddClosedQuestionModal from "./AddClosedQuestionModal"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Modal, Button, Card } from "react-bootstrap"
import { Fab } from "@material-ui/core"
import {
    faTrash,
    faArrowRight,
    faArrowUp,
    faArrowDown,
    faPlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TextField from "@material-ui/core/TextField"

const CreateQuiz = (props) => {
    const [currentLectureId, setCurrentLectureId] = useState(props.lectureId)
    const [childrens, setChildren] = useState([])
    const [quizes, setQuizes] = useState([])

    let changeFlag = useRef(false)

    const [visibleIndex, setVisibleIndex] = useState(null)
    const [visibleVariantIndex, setVisibleVariantIndex] = useState(null)

    const [quizName, setQuizName] = useState(null)
    const [quizDescription, setQuizDescription] = useState(null)

    const data = new Date(
        new Date().toString().split("GMT")[0] + " UTC"
    ).toISOString()
    const today = data.slice(0, -1)

    const [quizDateStart, setQuizDateStart] = useState(today)
    const [quizDateEnd, setQuizDateEnd] = useState(today)

    const [show, setShow] = useState()
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const { accessToken } = useAuthContext()

    const handleChangeInQuiz = () => {
        changeFlag.current = !changeFlag.current
    }

    const handleShowQuestion = (index) => {
        if (index === null) {
            setVisibleIndex(null)
            setVisibleVariantIndex(null)
        }
        if (visibleIndex === index) {
            setVisibleIndex(null)
        } else {
            setVisibleIndex(index)
        }
    }

    const handleShowVariant = (index) => {
        if (visibleVariantIndex === index) {
            setVisibleVariantIndex(null)
        } else {
            setVisibleVariantIndex(index)
        }
    }
    const handleNameChange = (e) => {
        setQuizName(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setQuizDescription(e.target.value)
    }

    const handleDateChange = (e) => {
        setQuizDateStart(e.target.value)
    }
    const handleDateChangeEnd = (e) => {
        setQuizDateEnd(e.target.value)
    }

    const addComponent = () => {
        let list = childrens
        list.push(1)
        setChildren(list)

        console.log(childrens)
    }

    const getQuizes = async () => {
        const api = ApiService(accessToken)
        const response = await api.getStreamById(props.lectureId)
        setQuizes(response.data.quiz)
    }

    const addNewQuiz = async () => {

        if(validate()){

            const api = ApiService(accessToken)
            const body = {
                //At this moment it gets courseId need to be changed
                lectureId: props.lectureId,
                description: quizDescription,
                name: quizName,
                startDate: quizDateStart,
                endDate: quizDateEnd,
            }

            console.log(body)

            try {
                await api.addQuiz(body)
                handleChangeInQuiz()
                handleClose()
            } catch (error) {
                console.error({ error })
            }
        }
    }

    const validate = () => {
        if(quizName === null | quizName === ""){
            window.alert("Podaj nazwe")
        }else if (quizDescription === null | quizDescription === ""){
            window.alert("Podaj opis")
        } else if(quizDateStart === null){
            window.alert("Podaj date rozpoczęcia")
        } else if(quizDateEnd === null){
            window.alert("Podaj date zakonczenia")
        }else {return true}
    }

    const deleteQuiz = async (id) => {
        const api = ApiService(accessToken)

        try {
            await api.removeQuiz(id)
            setQuizes(quizes.filter((quiz) => quiz.id != id))
            handleChangeInQuiz()
            window.alert("Usunieto quiz")
        } catch (error) {
            console.error(error)
        }
    }

    const deleteQuestion = async (id) => {
        const api = ApiService(accessToken)
        try {
            await api.removeQuestion(id)
            handleChangeInQuiz()
            window.alert("Usnieto pytanie")
        } catch (error) {}
    }

    useEffect(() => {
        if (currentLectureId != props.lectureId) {
            ///otherwise it wont work. And state will be reloading over and over and corupting stack memory
            setCurrentLectureId(props.lectureId) ///
            getQuizes()
        }
        if (changeFlag.current == true) {
            handleShowQuestion(null) ///FIXME
            getQuizes()
            handleChangeInQuiz()
        }
    }, [props.lectureId, changeFlag.current])

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>Dodawanie nowego quizu</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                    Utwórz Kwizz
                </Modal.Body>
                <form className="p-3 d-flex justify-content-center">
                    <div>
                        <TextField
                            className="createQuiz-textfield"
                            type="text"
                            id={`question`}
                            name="question"
                            variant="outlined"
                            label="Nazwa Quizu"
                            onChange={handleNameChange}
                        />

                        <br></br>
                        <TextField
                            className="createQuiz-textfield"
                            multiline="true"
                            id="question"
                            name="question"
                            variant="outlined"
                            label="Opis Quizu"
                            onChange={handleDescriptionChange}
                        />

                        <br></br>
                        <TextField
                            className="createQuiz-textfield"
                            id="datetime-local"
                            label="Kiedy Rozpoczęcie"
                            type="datetime-local"
                            defaultValue={today}
                            onChange={handleDateChange}
                        />

                        <br></br>
                        <TextField
                            className="createQuiz-textfield"
                            id="datetime-local"
                            label="Kiedy Zakończenie"
                            type="datetime-local"
                            defaultValue={today}
                            onChange={handleDateChangeEnd}
                        />

                        <br></br>
                    </div>
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={addNewQuiz}
                    >
                        Przejdz dalej
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <h3 className="d-flex justify-content-center">
                    Utwórz nowy quiz
                    <Button variant="light" onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlus} size="lg" />
                    </Button>
                </h3>
                {quizes.map((quiz, i) => (
                    <div>
                        {quiz.name}
                        <AddClosedQuestionModal
                            quizId={quiz.id}
                            handleChangeInQuiz={handleChangeInQuiz}
                        ></AddClosedQuestionModal>
                        <Fab
                            color="secondary"
                            aria-label="add"
                            onClick={() => deleteQuiz(quiz.id)}
                        >
                            <FontAwesomeIcon icon={faTrash} size="2x" />
                        </Fab>
                        <Fab onClick={() => handleShowQuestion(i)}>
                            {visibleIndex === i ? (
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    size="2x"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faArrowDown}
                                    size="2x"
                                ></FontAwesomeIcon>
                            )}
                        </Fab>
                        {quiz.questions.map((question, j) =>
                            visibleIndex === i ? (
                                <div>
                                    <Card>
                                        <Card.Body className="d-flex">
                                            <div className="quiz-left">
                                                {question.content}
                                            </div>
                                            <div className="quiz-end">
                                                <Fab
                                                    color="secondary"
                                                    onClick={() =>
                                                        deleteQuestion(
                                                            question.id
                                                        )
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        size="2x"
                                                    />
                                                </Fab>
                                                <Fab
                                                    className="ml-3"
                                                    onClick={() =>
                                                        handleShowVariant(j)
                                                    }
                                                >
                                                    {visibleVariantIndex ===
                                                    j ? (
                                                        <FontAwesomeIcon
                                                            icon={faArrowRight}
                                                            size="2x"
                                                        />
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            icon={faArrowDown}
                                                            size="2x"
                                                        ></FontAwesomeIcon>
                                                    )}
                                                </Fab>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <div>
                                        {question.variants.map((variant, g) =>
                                            visibleVariantIndex === j ? (
                                                <div>
                                                    <Card>
                                                        <Card.Body className="d-flex">
                                                            <div className="quiz-left">
                                                                {
                                                                    variant.content
                                                                }
                                                            </div>
                                                            <div className="quiz-end">
                                                                <Fab color="secondary">
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faTrash
                                                                        }
                                                                        size="2x"
                                                                    />
                                                                </Fab>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            ) : null
                                        )}
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default CreateQuiz
