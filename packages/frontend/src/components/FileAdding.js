import React, { useEffect } from "react";
import * as firebase from 'firebase'; ///CANT BE DELETED
import 'firebase/firestore';
import { firebaseAuth } from "services/firebase"
import { useUserInfo } from "../hooks/user"
import ApiService from "services/api"
import { useAuthContext } from "services/auth"
import { v4 as uuidv4 } from 'uuid';
import {Button} from "react-bootstrap"

const FileAdding = () => {
  const [fileUpload, setFileUpload] = React.useState(null);
  const [fileReference, setFileRef] = React.useState(null);

  const [lectureId, setLectureId] 
    = React.useState(window.location.pathname.split("/").slice(-1)[0])

  
  const user = useUserInfo();
  const { accessToken } = useAuthContext()


  ///FIXME: check if file is already in storage
  const addFile = async () => {
      if(fileUpload != null){
        if(user){
          ///Adding to firebase storage
          const file = fileUpload;
          const storageRef = firebaseAuth.storage().ref();
          const fileRef = storageRef.child(uuidv4());
          await fileRef.put(file);

          setFileRef(fileRef.fullPath);

          //adding to api database
          console.log(lectureId)
          const api = ApiService(accessToken)
          const body = {
              userId: user.id,
              lectureId: lectureId,
              name: fileRef.fullPath,
          }
          await api
              .addFile(body)
              .then((response) => console.log(response.data))
              .catch((error) => console.log(error))
  
          window.alert("Dodano plik");
        }
      }else {
        window.alert("Dodaj plik");
      }
  };

  //FOR EXAMPLE
  const remove = async () => {
      const storageRef = firebaseAuth.storage().ref();
      const fileRef = storageRef.child(fileReference)
      await fileRef.delete();
  }

  const handleChange = async (e) => {
      setFileUpload(e.target.files[0]);
  }

  useEffect(() => {
  }, []);

  return (
    <>
        <input className="file-upload" type="file" onChange={handleChange} size="30" />
        <Button valiant="secondary" onClick={addFile}>Dodaj</Button>

    </>
  );
}

export default FileAdding;