import React, { Fragment, useEffect, useState, useRef } from "react"
import { useHistory } from "react-router-dom"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { useUserInfo } from "hooks"
import { Modal, Button, Card } from "react-bootstrap"

const GetQuiz = (props) => {
    const [quizes, setQuizes] = useState([])

    const { accessToken } = useAuthContext()
    const history = useHistory()

    const [finishedQuizes, setFinishedQuizes] = useState([])

    const userInfo = useUserInfo()
    const lecturer = props.lecturer

    const moveToQuizPage = (id) => {
        history.push({
            pathname: `/quiz/${id}`,
            state: {
                quizId: id,
                courseId: props.courseId,
            },
        })
    }

    const moveToAdminQuizPanel = (id) => {
        history.push({
            pathname: `/quizAdminPanel/${id}`,
            state: {
                courseId: props.courseId,
                quizId: id,
            },
        })
    }
    const moveToQuizFinished = async (id) => {
        history.push({
            pathname: `/quizFinished/${id}`,
            state: {
                quizId: id,
                userId: userInfo.id,
            },
        })
    }

    const getQuizes = async () => {
        if (props.lectureId !== null) {
            try {
                const api = ApiService(accessToken)
                const response = await api.getStreamById(props.lectureId)
                setQuizes(response.data.quiz)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const getUserAnswers = async () => {
        let list = []
        for (let i = 0; i < quizes.length; i++) {
            const api = ApiService(accessToken)
            const userAnswerResponse = await api.getUserUserAnswers(
                userInfo.id,
                quizes[i].id
            )

            console.log(userAnswerResponse)

            if (userAnswerResponse.data.length === 0) {
                list.push(false)
                break
            }
            if (userAnswerResponse.data[0].length === 0) {
                list.push(false)
            } else {
                list.push(true)
            }
        }
        setFinishedQuizes(list)
    }

    const handleDisable = (mStartDate, mEndDate) => {
        const startDate = new Date(mStartDate).getTime()
        const endDate = new Date(mEndDate).getTime()
        const currentDate = Date.now() + 3600000

        return (startDate < currentDate) & (currentDate < endDate)
    }

    const formatDate = (string) => {
        return string.slice(0, 10) + " " + string.slice(11, 19)
    }

    useEffect(() => {
        if (quizes.length === 0) {
            getQuizes()
        }
    }, [props.lectureId])

    useEffect(() => {
        if (quizes.length !== 0) {
            getUserAnswers()
        }
    }, [quizes])
    //quizes deleted from useEffect

    return (
        <>
            <h4 className="d-flex justify-content-center mt-3">
                Lista Quizów w wykładzie
            </h4>

            <div className="card border-dark">
                <div className="card-body text-dark">
                    <h5 className="card-title">Pliki {props.lectureId}</h5>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nazwa</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Rozpoczecie</th>
                                    <th scope="col">Zakonczenie</th>
                                    <th scope="col">Quiz</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizes.map((quiz, i) => (
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{quiz.name}</td>
                                        <td>Status</td>
                                        <td>{formatDate(quiz.startDate)}</td>
                                        <td>{formatDate(quiz.endDate)}</td>
                                        <td>
                                            {finishedQuizes[i] === true ? (
                                                <Button
                                                    variant="danger"
                                                    onClick={() =>
                                                        moveToQuizFinished(
                                                            quiz.id
                                                        )
                                                    }
                                                >
                                                    Quiz ukończony
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="danger"
                                                    disabled={
                                                        !handleDisable(
                                                            quiz.startDate,
                                                            quiz.endDate
                                                        )
                                                    }
                                                    onClick={() =>
                                                        moveToQuizPage(quiz.id)
                                                    }
                                                >
                                                    Quiz
                                                </Button>
                                            )}
                                            {lecturer === userInfo.email ? (
                                                <Button
                                                    className="ml-3"
                                                    variant="danger"
                                                    onClick={() =>
                                                        moveToAdminQuizPanel(
                                                            quiz.id
                                                        )
                                                    }
                                                >
                                                    Admin Panel
                                                </Button>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetQuiz
