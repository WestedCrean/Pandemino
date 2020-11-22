import React, { Fragment, useEffect, useState, createFactory} from "react"
import AddClosedQuestionModal from "./AddClosedQuestionModal";
import { useAuthContext } from "services/auth"
import { useHistory } from "react-router-dom"
import ApiService from "services/api"


const CreateQuiz = () => {

    const [childrens, setChildren] = useState([]);

    const { accessToken } = useAuthContext()

    const addComponent = () =>{

        let list = childrens;
        list.push(1)
        setChildren(list)

        console.log(childrens)
    }

    
    const addNewQuiz = async () => {

        const api = ApiService(accessToken)
        const body = {
            lectureId: window.location.pathname.split("/").slice(-1)[0],
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
    
    }, [childrens])


    return(

        <div>
            <h1>Tutaj moze utworzyc quiz</h1>
            <button onClick={addNewQuiz}>Dodaj nowy quiz do tego kursu</button>
            <AddClosedQuestionModal></AddClosedQuestionModal>


        </div>

        
    )
}

export default CreateQuiz;
