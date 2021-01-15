import React, { Fragment, useEffect, useState } from "react"

import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Modal, Button, Card } from "react-bootstrap"
import { useUserInfo } from "hooks"
import FancyWave from "components/FancyWave"

const QuizAdminPanel = (props) => {
    const [userPoints, setUserPoints] = useState([])
    const [userList, setUserList] = useState([])
    const [questions, setQuestions] = useState(0)
    const { accessToken } = useAuthContext()

    const quizId = props.location.state.quizId
    const courseId = props.location.state.courseId

    const getUserAnswers = async () => {
        try {
            const api = ApiService(accessToken)

            const quizResponse = await api.getQuizById(quizId)
            setQuestions(quizResponse.data.questions.length)

            const responseCourses = await api.getCourseById(courseId)
            let userListTemp = []
            let userPointsTemp = []
            responseCourses.data.userCourses.map((userCourse) => {
                userListTemp.push({
                    userId: userCourse.user.id,
                    userName: userCourse.user.email,
                })
                userPointsTemp.push(0)
            })

            for (let i = 0; i < userListTemp.length; i++) {
                const response = await api.getUserUserAnswers(
                    userListTemp[i].userId,
                    quizId
                )
                console.log(response.data)
                if (response.data.length === 0) {
                    userPointsTemp[i] = "NaN"
                    continue
                }
                const data = response.data[0].userAnswer

                let tempPoints = 0
                for (let j = 0; j < data.length; j++) {
                    tempPoints += parseFloat(data[j].points)
                }

                userPointsTemp[i] = tempPoints
            }

            setUserPoints(userPointsTemp)
            setUserList(userListTemp)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserAnswers()
    }, [])

    return (
        <div>
            <FancyWave></FancyWave>
            <div className="quiz-finished-cointainer">
                <div className="row justify-content-center mt-5 mb-2">
                    <h2>Quiz admin Panel</h2>
                </div>

                <div className="quiz-table">
                    <table className="table">
                        <thead>
                            <tr className="quiz-tr-1">
                                <th scope="col">#</th>
                                <th scope="col">Użytkownik</th>
                                <th scope="col">Liczba punktów</th>
                                {/* <th scope="col">Punkty</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user, i) => (
                                <tr className={`quiz-tr-${i % 2}`}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{user.userName}</td>
                                    <td>
                                        {userPoints[i] !== "NaN"
                                            ? `${parseFloat(
                                                  userPoints[i]
                                              ).toFixed(2)} / ${questions}`
                                            : "Nie przystąpił"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default QuizAdminPanel
