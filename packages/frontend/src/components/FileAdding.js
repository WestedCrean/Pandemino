import React, { useEffect, useState, useRef  } from "react";
import * as firebase from 'firebase'; ///CANT BE DELETED
import 'firebase/firestore';
import { firebaseAuth } from "services/firebase"
import { useUserInfo } from "../hooks/user"
import ApiService from "services/api"
import { useAuthContext } from "services/auth"
import { v4 as uuidv4 } from 'uuid';
import {Button} from "react-bootstrap"

const FileAdding = (props) => {
  const [fileUpload, setFileUpload] = React.useState(null);
  const [fileReference, setFileRef] = React.useState(null);

  const [lectureId, setLectureId] = useState(props.lectureId)

  const user = useUserInfo();
  const { accessToken } = useAuthContext()


  const getExtensionAndName = (string) => {
    const lastIndex = string.lastIndexOf('.')
    return {"extension" : string.slice(lastIndex + 1), "name" : string.slice(0, lastIndex) }
  }

  const afterFileAdded = (response) => {
    
    if(response.status === 201){
      props.handleChange()
    }
  }

  const addFile = async () => {
      const api = ApiService(accessToken)

      const file = fileUpload;
      const fileData = getExtensionAndName(file.name)

      const storageRef = firebaseAuth.storage().ref();
      const fileRef = storageRef.child(uuidv4());

      const body = {
          userId: user.id,
          lectureId: lectureId,
          fireBaseUUID: fileRef.fullPath,
          originalName: fileData.name,
          extention: fileData.extension
      }

      if(fileUpload != null){
        if(user){


          try{
            ///Adding to firebase storage
            await fileRef.put(file);

            try {
              //adding to api database
              const response = await api.addFile(body)
              afterFileAdded(response)
              
            }catch(error){console.error(error)}
          }catch(error){console.error(error)}

          window.alert("Dodano plik");
        }
      }else {
        window.alert("Dodaj plik");
      }
  };



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