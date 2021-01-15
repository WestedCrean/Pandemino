import React, { useEffect, useState, useRef } from "react"
import * as firebase from "firebase" ///CANT BE DELETED
import "firebase/firestore"
import { firebaseAuth } from "services/firebase"
import { useUserInfo } from "../hooks/user"
import ApiService from "services/api"
import { useToasts } from "react-toast-notifications"
import { useAuthContext } from "services/auth"

import FileAdding from "components/FileAdding"
import DeleteFile from "./FileRemove"

const Files = (props) => {
    let lectureId = props.lectureId
    const { addToast, toastStack } = useToasts()
    const [lectures, setLectures] = useState(null)
    const [urls, setUrls] = useState([])
    const [files, setFiles] = useState([])

    const user = useUserInfo()
    const { accessToken } = useAuthContext()

    const [changeFlag, setChangeFlag] = useState(false)
    const handleChangeInFiles = () => {
        setChangeFlag(!changeFlag)
    }

    const addFile = () => {
        if (lectures != null) {
            if (user.email == lectures.course.lecturer.email) {
                return (
                    <FileAdding
                        lectureId={lectureId}
                        handleChange={handleChangeInFiles}
                    ></FileAdding>
                )
            }
        }
    }

    const deleteFile = (id) => {
        if (lectures != null) {
            if (user.email == lectures.course.lecturer.email) {
                return (
                    <DeleteFile
                        fileId={id}
                        handleChange={handleChangeInFiles}
                    />
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
            //addToast("Błąd połączenia z serwerem", { appearance: "error" })
        }
    }

    const getFiles = async () => {
        let urlList = []
        let fileList = []

        if (lectures !== null) {
            lectures.file.map(async (file) => {
                try {
                    const storageRef = firebaseAuth.storage().ref()
                    const fileRef = storageRef.child(file.fireBaseUUID)
                    urlList.push(await fileRef.getDownloadURL())
                    fileList.push({
                        id: file.id,
                        extension: file.extension,
                        name: file.originalName,
                    })
                } catch {}
            })
            setFiles(fileList)
            setUrls(urlList)
        }
    }

    useEffect(() => {
        if (changeFlag === true) {
            getFiles()
            handleChangeInFiles()
        }
        if (lectures == null) {
            getStream()
        }
        if (urls.length == 0) {
            getFiles()
        }
    }, [lectures, lectureId, changeFlag])

    return (
        <>
            <div className="card border-dark">
                <div className="card-body text-dark">
                    <h5 className="card-title">Pliki</h5>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nazwa</th>
                                    <th scope="col">Link</th>
                                    <th scope="col">Rozszerzenie</th>
                                    <th scope="col">Usuń</th>
                                </tr>
                            </thead>
                            <tbody>
                                {urls.map((url, i) => (
                                    <tr key={`${url.id}`}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{files[i].name}</td>
                                        <td>
                                            <a href={url}>Przenieś mnie</a>
                                        </td>
                                        <td>{files[i].extension}</td>
                                        <td>{deleteFile(files[i].id)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {addFile()}
        </>
    )
}

export default Files
