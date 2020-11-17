import React, { useEffect } from "react";
import * as firebase from 'firebase'; ///CANT BE DELETED
import 'firebase/firestore';
import { firebaseAuth } from "services/firebase"
import ApiService from "services/api"
import { useAuthContext } from "services/auth"
import {Button} from "react-bootstrap"


const FileRemove = ({fileId}) => {

  const { accessToken } = useAuthContext()

  const remove = async () => {

      const api = ApiService(accessToken)
      let file = null;
      try{
        await api
          .getFileById(fileId)
          .then((response) => file = response.data)

        console.log(file)
      } catch (error) {
        console.error({ error })
      }

      try{
        const storageRef = firebaseAuth.storage().ref();
        const fileRef = storageRef.child(file.name)
        await fileRef.delete();

        await api.deleteFile(fileId)

        console.log("Usunieto plik")
      }catch{}

  }


  useEffect(() => {
    
  }, []);

  return (
    <>
      <Button valiant="danger" onClick={remove}>Usun plik</Button>
    </>
  );
}

export default FileRemove;