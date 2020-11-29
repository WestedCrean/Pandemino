import React, { Fragment, useEffect, useState } from "react"

import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Modal, Button, Card } from "react-bootstrap"
import { useUserInfo } from "hooks"


const QuizPage = (props) => {
    
    const quizId = props.location.state.quizId
    const [quiz, setQuiz] = useState({})
    const { accessToken } = useAuthContext()

    const userInfo = useUserInfo()

    const [counter, setCounter] = useState(5)
    const [formatedCounter, setFormatedCounter] = useState("")
    const [questionCount, setQuestionCount] = useState(0)
    const [isFetched, setIsFetched] = useState(false)
    const [currentQuestion, setQurrentQuestion] = useState(0)

    const [answersList, setAnswersList] = useState([])

    const nextQuestionHandler = () =>{
        const max = 3
        if( (currentQuestion) + 1 < max ){
            setQurrentQuestion(currentQuestion + 1)
        }
    }

    const prevQuestionHandler = () =>{

        if( (currentQuestion) - 1 >= 0 ){
            setQurrentQuestion(currentQuestion - 1)
        }
    }

    const setAnswer = (i, mAnswer) => {
        let list = answersList
        list[i] = mAnswer
        setAnswersList(list)
        console.log(list)
    }

    const handleChecked = (currentQuestion, variant) => {

        if(answersList[currentQuestion] == variant){
            return true
        } else {
            return false
        }
    }


    const formatSeconds = (time) => {
        let hours = Math.floor(time / 3600);
        if (hours < 10) hours= "0" + hours
        let minutes = Math.floor(time / 60) 
        if (minutes < 10) minutes = "0" + minutes;
        let seconds = time - (60 * minutes)
        if (seconds < 10) seconds="0" + seconds;

        return hours + "h " + minutes + "m " + seconds + "s";
    }

    const finishQuiz = async () => {

        try{
            const api = ApiService(accessToken)
            for(let i = 0; i < quiz.questions.length; i++){

                const body = {
                    userId : userInfo.id,
                    questionId : quiz.questions[i].id,
                    answer : answersList[i]
                }
                //console.log(body)

                const response = await api.putUserAnswer(body)
                console.log(response.data)

            }
        }catch(error){console.log(error)}

        //console.log(userInfo)
    }

    const getQuiz = async () =>{
        if(quizId !== null){
            try {
                const api = ApiService(accessToken)
                const response = await api.getQuizById(quizId)
                setQuiz(response.data)

                setCounter((new Date(response.data.endDate).getTime() - new Date(response.data.startDate).getTime()) / 1000)
                //TARGET TIME CALCULATING
                //setCounter( (new Date(response.data.endDate).getTime() - Date.now() + 3600000 ) / 1000)
                
                setQuestionCount(response.data.questions.length)
                let list = []
                for(let i = 0; i < questionCount; i++){
                    list.push(null)
                }
                setAnswersList(list)
                setIsFetched(true)
            }catch(error){console.log(error)}
        }
    } 

    useEffect(() => {
        //FIXME
        if(!isFetched){
            getQuiz()
        }
        

        if(counter == 0){
            finishQuiz()
        }

        const timer = setTimeout(() => {
            setCounter(counter -1)
            setFormatedCounter(formatSeconds(counter))
        }, 1000);
        
        return () => clearTimeout(timer);


    }, [counter])

    return (
        <div>
            <div class="row justify-content-center mt-5 mb-2">
                <h2>Pozostały czas</h2>
            </div>
            <div class="row justify-content-center border rounded-pill" id="countdown">{formatedCounter}</div>

            
            <div className="card border  m-4">
                <div className="card-body text-dark">
                    <h5 className="card-title">Quiz</h5>
                    <div className="quiz-content">
                        {/* {quiz.description} */}
                    </div>
                    <div className="question-view">

                        {isFetched !== false ? 
                        <div>
                            {quiz.questions[currentQuestion].content}

                            <form className="p-3">
                            {quiz.questions[currentQuestion].variants.map((variant, i) => (
                                <div>
                                    <label>{variant.content}</label>
                                    {quiz.questions[currentQuestion].multiple == false ? 
                                        <input type="radio" name="isTrue" checked={handleChecked(currentQuestion, variant.content)} 
                                            onChange={(e) => setAnswer(currentQuestion, variant.content) }/>
                                        : 
                                        <input type="checkbox" name="isTrue" onClick={() => setAnswer(currentQuestion, variant.content)}/>
                                        }
                                </div>
                                ))}
                            </form>
                        </div>
                        : null }

                        <div className="m-3">
                            <Button className="float-left ml-5" variant="secondary" onClick={() => prevQuestionHandler()}>Poprzednie</Button>
                            <Button className="float-right mr-5" variant="secondary" onClick={() => nextQuestionHandler()}>Następne</Button>
                        </div>
                    </div>
                </div>
                <div>
                    <Button className="float-left ml-5" variant="secondary" onClick={() => finishQuiz()}>Wyslij quiz</Button>
                </div>
            </div>
        </div>
    )
}

export default QuizPage
