import React, { Fragment, useEffect, useState, useCallback } from "react"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import FancyWave from "components/FancyWave"
import {Button} from "react-bootstrap"
import { v4 as uuidv4 } from 'uuid';
import 'firebase/firestore';
import { firebaseAuth } from "services/firebase"

const UserPanel = () => {
    const [userData, setUserData] = useState(null)

    ///FIXME: more values
    const [id, setId] = useState()
    const [name, setName] = useState()
    const [lastName, setlastName] = useState()
    const [image, setImage] = useState(null)
    const [imageRef, setImageRef] = useState(null)

    const [pending, setPending] = useState(true)

    const { accessToken } = useAuthContext()
    const { user } = useAuthContext()

    ///image
    const [fileUpload, setFileUpload] = React.useState(null);
    const [fileReference, setFileRef] = React.useState(null);

    const api = ApiService(accessToken)
    const userEmail = user.email

    const addFile = async () => {
        const api = ApiService(accessToken)

        const file = fileUpload;

        const storageRef = firebaseAuth.storage().ref();
        const fileRef = storageRef.child(uuidv4());

        const body = {
            imageUuid : fileRef.fullPath
        }

        if(fileUpload != null){
            if(user){

            try{
              ///Adding to firebase storage
                await fileRef.put(file);

                try {
                    await api
                        .putUserData(id, body)
                        .then((response) => console.log(response.data))
                        .catch((error) => console.log(error))

                        try {
                            if(imageRef !== null){
                                const deleteItem = firebaseAuth.storage().ref();
                                const fileRef = deleteItem.child(imageRef)
                                await fileRef.delete();
                            }
                        }catch(error){}

                
                        window.alert("Edytowano zdjęcie użytkownika")
                        window.location.reload();
                
                }catch(error){console.error(error)}
            }catch(error){console.error(error)}

            //window.alert("Dodano plik");
            }
        }else {
            window.alert("Dodaj plik");
        }
    };

    const getUserData = async () => {
        try {
            await api
                .getUserByEmail(userEmail)
                .then((response) => {
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
        }
        try {
            await api
                .putUserData(id, body)
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error))

            window.alert("Edytowano dane użytkownika")
            window.location = "/lecture"
        } catch { }
    }

    const setStates = async () => {
        setId(userData.id)
        setName(userData.firstName)
        setlastName(userData.lastName)
        setImageRef(userData.imageUuid);

        try {
            const storageRef = firebaseAuth.storage().ref();
            const fileRef = storageRef.child(userData.imageUuid)
            setImage(await fileRef.getDownloadURL())
        }catch(error){}

    }

    const handleChange = async (e) => {
        setFileUpload(e.target.files[0]);
    }

    useEffect(() => {
        if (pending) {
            getUserData()
        } else {
            setStates()
        }
    }, [pending])

    return (
        <div class="wrapper">
            <FancyWave></FancyWave>
            <div class="box grid-courses">
                <div className="box-label">
                    <div className="box-label-name">PANEL UŻYTKOWNIKA</div>
                </div>
                <div className="row user-panel-container">
                    <div class="panel-body col-lg-8">
                        <form class="form-horizontal">
                            <div class="">
                                <div class="">
                                    <div class="form-group">
                                        <label
                                            for="inputtext1"
                                            class="control-label"
                                        >
                                            Imie
                                        </label>
                                        <div class="">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="inputtext1"
                                                placeholder=""
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            ></input>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label
                                            for="inputtext2"
                                            class="control-label"
                                        >
                                            Nazwisko
                                        </label>
                                        <div class="">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="inputtext2"
                                                placeholder=""
                                                value={lastName}
                                                onChange={(e) =>
                                                    setlastName(e.target.value)
                                                }
                                            ></input>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label
                                            for="inputtext2"
                                            class="control-label"
                                        >
                                            Email
                                        </label>
                                        <div class="">
                                            <input
                                                type="email"
                                                class="form-control"
                                                id="inputtext2"
                                                placeholder=""
                                                value={userEmail}
                                                disabled={true}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row text-center">
                                <button
                                    type="button"
                                    class="btn btn-danger"
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
                            <input className="file-upload" type="file" onChange={handleChange} size="30" />
                            <Button valiant="secondary" onClick={addFile}>Dodaj</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPanel
