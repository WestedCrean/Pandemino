import React, { Fragment, useEffect, useState } from "react"

import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import { Modal, Button, Card } from "react-bootstrap"
import { useUserInfo } from "hooks"
import FancyWave from "components/FancyWave"

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

        if( (currentQuestion) + 1 < questionCount ){
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
    }

    const setMultiAnswer = (i, mAnswer, checked) => {
    
        let list = answersList
        if(checked){

            let singleElement
            if(list[i] == undefined){
                singleElement = []
            } else {
                singleElement = list[i]
            }

            singleElement.push(mAnswer)
            list[i] = singleElement

        }else{

            let singleElement = list[i]
            list[i] = singleElement.filter((item) => item !== mAnswer)
        }
        setAnswersList(list)
    }

    const handleChecked = (currentQuestion, variant) => {
        const value = answersList[currentQuestion];

        if(Array.isArray(value)){

            return value.includes(variant)
        }else {
            return value === variant
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


                const variants = quiz.questions[i].variants
                //console.log(variants)
                let points = 0

                if(quiz.questions[i].multiple == false){
                    for(var j = 0; j < variants.length; j++){
                        if(variants[j].isTrue){
                            if(variants[j].content === answersList[i]){
                                points = 1
                            }
                        }
                    }
                } else {
                    const correctAnswers = variants.filter(x => x.isTrue).length
                    const pointsPerQuestion = 1/correctAnswers

                    for(var j = 0; j < variants.length; j++){
                        if(variants[j].isTrue){
                            if(answersList[i].includes(variants[j].content)){
                                points = points + pointsPerQuestion
                            }
                        }else{
                            if(answersList[i].includes(variants[j].content)){
                                points = points - pointsPerQuestion
                            }
                        }
                        if(points > 0.98 & points < 1.01){
                            points = 1
                        }
                        if(points < 0){
                            points = 0
                        }
                    }
                }
    

                const body = {
                    userId : userInfo.id,
                    questionId: quiz.questions[i].id,
                    answer: answersList[i],
                    points: points
                }

                const response = await api.putUserAnswer(body)
            }
        }catch(error){console.log(error)}

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
            <FancyWave></FancyWave>
            <div class="row justify-content-center mt-5 mb-2 ">
                <h2 >Pozostały czas</h2>
            </div>
            <div class="row justify-content-center border rounded-pill time-remains" id="countdown">{formatedCounter}</div>

            
            <div className="card border m-4 quiz-form-container">
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
                                        <input type="checkbox" name="isTrue" checked={handleChecked(currentQuestion, variant.content)}
                                            onClick={(e) => setMultiAnswer(currentQuestion, variant.content, e.target.checked)}/>
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
