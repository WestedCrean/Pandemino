import React, { Fragment, useEffect, useState, createFactory} from "react"
import AddClosedQuestionModal from "./AddClosedQuestionModal";
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Modal, Button } from "react-bootstrap"
import { Fab } from "@material-ui/core"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CreateQuiz = (props) => {

    let currentLectureId = props.lectureId
    const [childrens, setChildren] = useState([]);
    const [quizes, setQuizes] = useState([]);

    const [quizName,setQuizName] = useState();
    const [quizDescription,setQuizDescription] = useState();
    const [quizDateStart,setQuizDateStart] = useState();
    const [quizDateEnd,setQuizDateEnd] = useState();


    const [show,setShow] = useState();
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const { accessToken } = useAuthContext()



    const addComponent = () =>{

        let list = childrens;
        list.push(1)
        setChildren(list)

        console.log(childrens)
    }


    const getQuizes = async () => {

        const api = ApiService(accessToken);
        const response = await api.getQuizes()

        setQuizes(response.data);
    }

    const addNewQuiz = async () => {
        console.log(quizDateStart)
        const api = ApiService(accessToken)
        const body = {
            //At this moment it gets courseId need to be changed 
            lectureId: currentLectureId,
            description: quizDescription,
            name: quizName,
            startDate:quizDateStart,
            endDate:quizDateEnd
        }

        try {
            await api.addQuiz(body)
            handleClose()

        } catch (error) {
            console.error({ error })
        }
    }

    const deleteQuiz = async (id) => {
        const api = ApiService(accessToken)

        try {
            await api.removeQuiz(id)
            setQuizes(quizes.filter(quiz => quiz.id !=id))
        } catch (error) {
            console.error(error)
        }
        
    }


    useEffect(() => {
        getQuizes()
    }, [childrens])


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>Dodawanie nowego quizu</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Utwórz Kwizz</Modal.Body>
                <form className="p-3">
                    <div>
                        <input
                            type="text"
                            id={`question`}
                            name="question"
                            onChange={(e) => setQuizName(e.target.value)}
                        />
                        <label for="question">Nazwa Quizu</label>
                        <br></br>
                        <input
                            type="textarea"
                            id="question"
                            name="question"
                            onChange={(e) => setQuizDescription(e.target.value)}
                        />
                        <label for="question">Opis Quizu</label>
                        <br></br>
                        <input
                            type="date"
                            id="dateQuestionStart"
                            name="dateQuestionStart"
                            onChange={(e) => setQuizDateStart(e.target.value)}
                        />
                        <label for="dateQuestionStart">Data Rozpoczecia</label>
                        <br></br>
                        <input
                            type="date"
                            id="dateQuestionEnd"
                            name="dateQuestionEnd"
                            onChange={(e) => setQuizDateEnd(e.target.value)}
                        />
                        <label for="dateQuestionEnd">Data Rozpoczecia</label>
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
                <h1>Tutaj moze utworzyc quiz</h1>
                <button onClick={handleShow}>
                    Dodaj nowy quiz do tego kursu
                </button>

                {quizes.map((quiz, i) => (
                    <div>
                        {quiz.name}

                        <AddClosedQuestionModal
                            quizId={quiz.id}
                        ></AddClosedQuestionModal>
                        <Fab
                            color="secondary"
                            aria-label="add"
                            onClick={() => deleteQuiz(quiz.id)}
                        >
                            <FontAwesomeIcon icon={faTrash} size="2x" />
                        </Fab>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CreateQuiz;
