import React, { Fragment, useEffect, useState } from "react"

import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Modal, Button, Card } from "react-bootstrap"
import { useUserInfo } from "hooks"


const QuizFinished = (props) => {
    
    const [userAnswers, setUserAnswers] = useState([])

    const { accessToken } = useAuthContext()

    const quizId = props.location.state.quizId
    const userId = props.location.state.userId

    const getUserAnswers = async () => {

        try {
            const api = ApiService(accessToken)
            const response = await api.getUserUserAnswers(userId, quizId)
            setUserAnswers(response.data[0].userAnswer)
        
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        getUserAnswers()
    }, [])

    return (
        <div>
            <div class="row justify-content-center mt-5 mb-2">
                <h2>Quiz zakończony</h2>
            </div>

                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Pytanie</th>
                                    <th scope="col">Odpowiedź</th>
                                    <th scope="col">Punkty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userAnswers.map((answer, i) => (
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{answer.question.content}</td>
                                        <td>{answer.answer}</td>
                                        <td>{answer.points}</td>
                                    </tr>
                                    
                                ))}
                            </tbody>
                        </table>
                    </div>
        </div>

    )
}

export default QuizFinished
