import React, { Fragment, useEffect, useState } from "react"

import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Modal, Button, Card } from "react-bootstrap"
import { useUserInfo } from "hooks"
import FancyWave from "components/FancyWave"

const QuizFinished = (props) => {
    
    const [userAnswers, setUserAnswers] = useState([])

    const { accessToken } = useAuthContext()

    const [points, setPoints] = useState(0)
    const quizId = props.location.state.quizId
    const userId = props.location.state.userId

    const getUserAnswers = async () => {

        try {
            const api = ApiService(accessToken)
            const response = await api.getUserUserAnswers(userId, quizId)
            const data = response.data[0].userAnswer
            console.log(data)
            setUserAnswers(data)
            
            let tempPoints = 0;
            for(let i = 0; i < data.length; i++){
                tempPoints += parseFloat(data[i].points);
            }
            setPoints(tempPoints)

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
          
            <div class="row justify-content-center mt-5 mb-2">
                <h2>Quiz zakończony</h2>
            </div>
    
                    <div className="quiz-table">
                        <table className="table">
                            <thead>
                                <tr className="quiz-tr-1">
                                    <th scope="col">#</th>
                                    <th scope="col">Pytanie</th>
                                    <th scope="col">Odpowiedź</th>
                                    <th scope="col">Punkty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userAnswers.map((answer, i) => (
                                    <tr className={`quiz-tr-${i%2}`}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{answer.question.content}</td>
                                        <td>{answer.answer}</td>
                                        <td>{parseFloat(answer.points).toFixed(2)}</td>
                                        
                                    </tr>
                                ))}
                                <tr className={`quiz-tr-${(userAnswers.length + 1)%2}`}>
                                    <td></td>
                                    <td></td>
                                    <th>Suma punktów</th>
                                    <td>{parseFloat(points).toFixed(2)}</td>
                                </tr>
            
                            </tbody>
                        </table>
                    </div>
               
        </div>
        </div>
    )
}

export default QuizFinished
