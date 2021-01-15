import React, { Fragment, useEffect, useState, useCallback } from "react"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import FancyWave from "components/FancyWave"
import { Button } from "react-bootstrap"
import { v4 as uuidv4 } from "uuid"
import "firebase/firestore"
import { firebaseAuth } from "services/firebase"

const UserPanel = () => {
    const [userData, setUserData] = useState(null)

    ///FIXME: more values
    const [id, setId] = useState()
    const [name, setName] = useState()
    const [lastName, setlastName] = useState()
    const [description, setDescription] = useState()
    const [image, setImage] = useState(null)
    const [imageRef, setImageRef] = useState(null)

    const [pending, setPending] = useState(true)

    const { accessToken } = useAuthContext()
    const { user } = useAuthContext()

    ///image
    const [fileUpload, setFileUpload] = React.useState(null)
    const [fileReference, setFileRef] = React.useState(null)

    const api = ApiService(accessToken)
    const userEmail = user.email

    const addFile = async () => {
        const api = ApiService(accessToken)

        const file = fileUpload

        const storageRef = firebaseAuth.storage().ref()
        const fileRef = storageRef.child(uuidv4())

        const body = {
            imageUuid: fileRef.fullPath,
        }

        if (fileUpload != null) {
            if (user) {
                try {
                    ///Adding to firebase storage
                    await fileRef.put(file)

                    try {
                        await api
                            .putUserData(id, body)
                            .then((response) => console.log(response.data))
                            .catch((error) => console.log(error))

                        try {
                            if (imageRef !== null) {
                                const deleteItem = firebaseAuth.storage().ref()
                                const fileRef = deleteItem.child(imageRef)
                                await fileRef.delete()
                            }
                        } catch (error) {}

                        window.alert("Edytowano zdjęcie użytkownika")
                        window.location.reload()
                    } catch (error) {
                        console.error(error)
                    }
                } catch (error) {
                    console.error(error)
                }

                //window.alert("Dodano plik");
            }
        } else {
            window.alert("Dodaj plik")
        }
    }

    const getUserData = async () => {
        try {
            await api.getUserByEmail(userEmail).then((response) => {
                setUserData(response.data)
                setPending(false)
            })
        } catch (error) {
            console.error({ error })
        }
    }

    const saveUserInfo = async () => {
        const body = {
            firstName: name,
            lastName: lastName,
            description: description,
        }
        try {
            await api
                .putUserData(id, body)
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error))

            window.alert("Edytowano dane użytkownika")
            window.location.reload()
        } catch {}
    }

    const setStates = async () => {
        setId(userData.id)
        setName(userData.firstName)
        setlastName(userData.lastName)
        setDescription(userData.description)
        setImageRef(userData.imageUuid)

        try {
            const storageRef = firebaseAuth.storage().ref()
            const fileRef = storageRef.child(userData.imageUuid)
            setImage(await fileRef.getDownloadURL())
        } catch (error) {}
    }

    const handleChange = async (e) => {
        setFileUpload(e.target.files[0])
    }

    useEffect(() => {
        if (pending) {
            getUserData()
        } else {
            setStates()
        }
    }, [pending])

    return (
        <div className="wrapper">
            <FancyWave></FancyWave>
            <div className="outer-wapper">
                <div className="box grid-courses">
                    <div className="box-label">
                        <div className="box-label-name">PANEL UŻYTKOWNIKA</div>
                    </div>
                    <div className="row user-panel-container">
                        <div className="panel-body col-lg-8">
                            <form className="form-horizontal">
                                <div className="">
                                    <div className="">
                                        <div className="form-group">
                                            <label
                                                for="inputtext1"
                                                className="control-label"
                                            >
                                                Imie
                                            </label>
                                            <div className="">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputtext1"
                                                    placeholder=""
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label
                                                for="inputtext2"
                                                className="control-label"
                                            >
                                                Nazwisko
                                            </label>
                                            <div className="">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputtext2"
                                                    placeholder=""
                                                    value={lastName}
                                                    onChange={(e) =>
                                                        setlastName(
                                                            e.target.value
                                                        )
                                                    }
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label
                                                for="inputtext2"
                                                className="control-label"
                                            >
                                                Opis
                                            </label>
                                            <div className="">
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    id="inputtext2"
                                                    placeholder=""
                                                    value={description}
                                                    onChange={(e) =>
                                                        setDescription(
                                                            e.target.value
                                                        )
                                                    }
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label
                                                for="inputtext2"
                                                className="control-label"
                                            >
                                                Email
                                            </label>
                                            <div className="">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="inputtext2"
                                                    placeholder=""
                                                    value={userEmail}
                                                    disabled={true}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row text-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={saveUserInfo}
                                    >
                                        Zapisz
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4">
                            <div className="avatar">Awatar</div>
                            <div className="image-container">
                                <img src={image}></img>
                            </div>
                            <div>
                                <input
                                    className="file-upload"
                                    type="file"
                                    onChange={handleChange}
                                    size="30"
                                />
                                <Button valiant="secondary" onClick={addFile}>
                                    Dodaj
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPanel
