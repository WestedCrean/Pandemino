import React, { Fragment, useEffect, useState, useRef } from "react"

import { useAuthContext } from "services/auth"
import ApiService from "services/api"
const GetQuiz = (props) => {
    const [quizes, setQuizes] = useState()

    const { accessToken } = useAuthContext()
    const lectureId = props.lectureId

    const getQuizes = async () => {
        const api = ApiService(accessToken)

        const response = await api.getStreamById(lectureId)

        setQuizes(response.data.quiz)
    }
    useEffect(() => {
        getQuizes()
        console.log(quizes)
    }, [])

    return (
        <>
            <h4 className="d-flex justify-content-center mt-3">
                Lista Quizów w wykładzie
            </h4>

            <div className="card border-dark">
                <div className="card-body text-dark">
                    <h5 className="card-title">Pliki</h5>
                    <div>
                        <table class="table">
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
                                {/* Fixme: why quizes are undefined?! */}
                                {/* {quizes.map((quiz, i) => (
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{quiz.name}</td>
                                        <td>Status</td>
                                        <td>{quiz.startDate}</td>
                                        <td>{quiz.endDate}</td>
                                        <td>Quiz</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetQuiz
