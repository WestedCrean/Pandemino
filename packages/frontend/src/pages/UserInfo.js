import React, { Fragment, useEffect, useState, useCallback } from "react"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"
import FancyWave from "components/FancyWave"
import {Button} from "react-bootstrap"
import { v4 as uuidv4 } from 'uuid';
import 'firebase/firestore';
import { firebaseAuth } from "services/firebase"

const UserInfo = ({location}) => {
    const [userData, setUserData] = useState(null)

    
    const [image, setImage] = useState(null)
    const [imageRef, setImageRef] = useState(null)

    const [pending, setPending] = useState(true)

    const { accessToken } = useAuthContext()
    const api = ApiService(accessToken)

    const userEmail = location.pathname.split("/").slice(-1)[0]



    
    const getUserData = async () => {
        try {
            await api
                .getUserByEmail(userEmail)
                .then((response) => {
                    console.log(response.data)
                    setUserData(response.data)
                    setPending(false)
                })

                
        } catch (error) {
            console.error({ error })
        }
    }


    const setStates = async () => {

        try {
            const storageRef = firebaseAuth.storage().ref();
            const fileRef = storageRef.child(userData.imageUuid)
            setImage(await fileRef.getDownloadURL())
        }catch(error){}

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
            <div className="outer-wapper">
            <div class="box grid-courses">
                <div className="box-label">
                    <div className="box-label-name">PANEL UŻYTKOWNIKA</div>
                </div>
                        <div className="row user-panel-container">
                            <div class="panel-body col-lg-8">
                            <div>

                                {userData !== null ? 
                                <div>
                                    <div className="user-name"> {userData.firstName} {userData.lastName} </div> 
                                    <div className="user-email">Email - {userData.email} </div>
                                    <div className="user-description">{userData.description}</div>
                                </div>
                                    : null}
                                </div>
                        
                    </div>
                    <div className="col-lg-4">
                        <div className="avatar">Awatar</div>
                        <div className="image-container">
                            <img src={image}></img>
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default UserInfo
