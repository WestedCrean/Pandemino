import React, { useEffect, useState } from "react";
import * as firebase from 'firebase'; ///CANT BE DELETED
import 'firebase/firestore';
import { firebaseAuth } from "services/firebase"
import { useUserInfo } from "../hooks/user"
import ApiService from "services/api"
import { useToasts } from "react-toast-notifications"
import { useAuthContext } from "services/auth"
import { useHistory } from 'react-router'
import {Button } from "react-bootstrap"
import FileAdding from "components/FileAdding"
import DeleteFile from "./FileRemove"

const Files = () => {

    const { addToast, toastStack } = useToasts()
    const [lectures, setLectures] = useState(null);
    const [urls, setUrls] = useState([]);
    const [ids, setIds] = useState([]);

    const lectureId = window.location.pathname.split("/").slice(-1)[0]

    const user = useUserInfo();
    const { accessToken } = useAuthContext()


    const addFile = () => {
        if(lectures != null){
            if(user.email == lectures.course.lecturer.email){
                return(
                    <FileAdding/>
                )
            }
        }
    }

    const deleteFile = (id) => {
        if(lectures != null){
            if(user.email == lectures.course.lecturer.email){
                return(
                    <DeleteFile fileId={id}/>
                )
            }
        }
    }

    const getStream = async () => {

        const api = ApiService(accessToken)
        try {
            const response = await api.getStreamById(lectureId)
            setLectures(response.data)
        } catch (error) {
            addToast("Błąd połączenia z serwerem", { appearance: "error" })
        }
    }

    const getFiles = async () => {
        let urlList = []
        let idList = []
        if(lectures !== null){
            lectures.file.map(async file => {
                const storageRef = firebaseAuth.storage().ref();
                const fileRef = storageRef.child(file.name)
                urlList.push(await fileRef.getDownloadURL())
                idList.push(file.id)
            })
            setIds(idList)
            setUrls(urlList);
        }
    }

    useEffect(() => {
        if(lectures == null){
            getStream()
        }
        if(urls.length == 0){
            getFiles();
        }
    }, [lectures]);

    return (
        <>
        <div className="card border-dark chat-window">
            <div className="card-body text-dark">
                <h5 className="card-title">Pliki</h5>
                {urls.map((url, i)=>(
                    <div className="file-container">
                        <Button variant="secondary">Przycisk nr {i}</Button><br></br>
                        {deleteFile(ids[i])}
                        <p1>{url}</p1>
                    </div>
                ))}
            </div>
            {addFile()}
            
        </div>
        </>
    )
}

export default Files