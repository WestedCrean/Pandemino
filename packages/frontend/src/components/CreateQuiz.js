import React, { Fragment, useEffect, useState, createFactory} from "react"
import AddClosedQuestionModal from "./AddClosedQuestionModal";
import { useAuthContext } from "services/auth"
import ApiService from "services/api"


const CreateQuiz = (props) => {

    let currentLectureId = props.lectureId
    const [childrens, setChildren] = useState([]);
    const [quizes, setQuizes] = useState([]);

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

        const api = ApiService(accessToken)
        const body = {
            //At this moment it gets courseId need to be changed 
            lectureId: currentLectureId,
            description: "do zmiany",
            name: "do zmiany",
        }

        try {
            await api.addQuiz(body)

        } catch (error) {
            console.error({ error })
        }
    }


    useEffect(() => {
        getQuizes()
    }, [childrens])


    return(

        <div>
            <h1>Tutaj moze utworzyc quiz</h1>
            <button onClick={addNewQuiz}>Dodaj nowy quiz do tego kursu</button>

            <h1>Quizy w tym kurwidołku</h1>
            {quizes.map((quiz,i) => (
                <div>{quiz.name}
                    
                <AddClosedQuestionModal></AddClosedQuestionModal>
                </div>
            ))}




        </div>

        
    )
}

export default CreateQuiz;
