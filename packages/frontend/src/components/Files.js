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

const Files = () => {

    const { addToast, toastStack } = useToasts()
    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);
    const lectureId = window.location.pathname.split("/").slice(-1)[0]

    const user = useUserInfo();
    const { accessToken } = useAuthContext()

    const { replace } = useHistory()


    const getStream = async () => {

        const api = ApiService(accessToken)
        try {
            const response = await api.getStreamById(lectureId)
            setFiles(response.data.file)
        } catch (error) {
            addToast("Błąd połączenia z serwerem", { appearance: "error" })
        }
    }

    const getFiles = async () => {
        let urlList = []
        files.map(async file => {
            const storageRef = firebaseAuth.storage().ref();
            const fileRef = storageRef.child(file.name)
            urlList.push(await fileRef.getDownloadURL())

        })
        setUrls(urlList);
    }

    useEffect(() => {
        if(files.length == 0){
            getStream()
        }
        if(urls.length == 0){
            getFiles();
        }
    }, [files]);

    return (
        <>
        <div className="card border-dark chat-window">
            <div className="card-body text-dark">
                <h5 className="card-title">Pliki</h5>
                {urls.map((url, i)=>(
                    <div className="file-container">
                        <Button variant="secondary">Przycisk nr {i}</Button><br></br>
                        <p1>{url}</p1>
                    </div>
                ))}
            </div>
             {/* FiXME: only for lecturer */}
            <FileAdding/>
        </div>
        </>
    )
}

export default Files