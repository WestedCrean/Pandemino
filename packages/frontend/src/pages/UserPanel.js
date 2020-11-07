import React, { Fragment, useEffect, useState, useCallback } from "react"
import Navbar from "../components/Navbar"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"

const UserPanel = () => {

    const [ userData, setUserData ] = useState(null);

    const [ name, setName ] = useState();
    const [ lastName, setlastName ] = useState();
    const [ title, setTitle ] = useState();
    const [ email, setEmail ] = useState();

    const [ pending, setPending ] = useState(true);

    const { accessToken } = useAuthContext()
    const { user } = useAuthContext()

    const streamsRepository = ApiService(accessToken).streams
    const userEmail = user.email

    const getUserData = async () => {
        try {
            await streamsRepository.getUserByEmail(userEmail).then(
                (response) =>  {
                    setUserData(response.data)
                    setPending(false)
                }
            )
        } catch (error) {
            console.error({ error })
        }
    };
    
    const saveUserInfo = async () => {

        
    }

    const setStates = () => {

        setName(userData.firstName);
        setlastName(userData.lastName)
        setTitle(userData.title)
        setEmail(userData.email)
    }

    useEffect(() => {
        if(pending){
            getUserData()
        }else {
            setStates();
        }
    },[pending])


    return (
        <div>
            <Navbar></Navbar>
            <Fragment>
                <div class="wrapper">
                    <div class="box grid-courses">
                        <div className="box-label">
                            <div className="box-label-name">
                                PANEL UŻYTKOWNIKA
                            </div>
                        </div>
                        <div className="user-panel-container">
                            <div class="panel-body">
                                <form class="form-horizontal">
                                    <div class="row">
                                    <div class="col-sm-9 col-lg-10">
                                        <div class="form-group">
                                        <label for="inputtext1" class="col-sm-4  col-md-4 col-lg-3 control-label">Imie</label>
                                        <div class="col-sm-8 col-lg-9">
                                            <input type="text" class="form-control" id="inputtext1" placeholder="" value={name}></input>
                                        </div>
                                        </div>
                                        <div class="form-group">
                                        <label for="inputtext2" class="col-sm-4  col-md-4 col-lg-3 control-label">Nazwisko</label>
                                        <div class="col-sm-8 col-lg-9">
                                            <input type="text" class="form-control" id="inputtext2" placeholder="" value={lastName}></input>
                                        </div>
                                        </div>
                                        <div class="form-group">
                                        <label for="inputtext3" class="col-sm-4   col-md-4 col-lg-3 control-label">Tytuł</label>
                                        <div class="col-sm-8 col-lg-9">
                                            <input type="text" class="form-control" id="inputtext3" placeholder="" value={title}></input>
                                        </div>
                                        </div>
                                        <div class="form-group">
                                        <label for="inputtext2" class="col-sm-4  col-md-4 col-lg-3 control-label">Email</label>
                                        <div class="col-sm-8 col-md-8  col-lg-9">
                                            <input type="email" class="form-control" id="inputtext2" placeholder="" value={email}></input>
                                        </div>
                                        </div>
                                        <div class="form-group">
                                        <label for="inputtext2" class="col-sm-4   col-md-4 col-lg-3 control-label">Rola</label>
                                        <div class="col-sm-8 col-lg-9">
                                            <input type="text" class="form-control" id="inputtext2" placeholder=""></input>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="row text-center">
                                    <button type="button" class="btn btn-danger">Zapisz</button>
                                </div>
                                </form>
  
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        </div>
    )
}


export default UserPanel;