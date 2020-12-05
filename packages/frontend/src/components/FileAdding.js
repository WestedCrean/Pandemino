import React, { useEffect, useState, createRef, useMemo  } from "react";
import * as firebase from 'firebase'; ///CANT BE DELETED
import 'firebase/firestore';
import { firebaseAuth } from "services/firebase"
import { useUserInfo } from "../hooks/user"
import ApiService from "services/api"
import { useAuthContext } from "services/auth"
import { v4 as uuidv4 } from 'uuid';
import {Button} from "react-bootstrap"


import Dropzone from 'react-dropzone'
import { useDropzone } from "react-dropzone";

import ProgressBar from "./ProgressBar"

const baseStyle = {
  flex: 1,
  flexDirection: "column",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#333131",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};



const FileAdding = (props) => {

  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
    });



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
      setUploading(true)

      const api = ApiService(accessToken)

      const file = files[0];
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

      if(file != null){
        if(user){


          try{
            ///Adding to firebase storage
            const task = fileRef.put(file);
            
            task.on("state_changed", (taskSnapshot) => {
              setProgress(taskSnapshot.bytesTransferred/taskSnapshot.totalBytes * 100)
              if(taskSnapshot.bytesTransferred == taskSnapshot.totalBytes){
                window.alert("Dodano plik");
                window.location.reload();
              }
            });


            try {
              //adding to api database
              const response = await api.addFile(body)
              afterFileAdded(response)
              
            }catch(error){console.error(error)}
          }catch(error){console.error(error)}

        }
      }else {
        window.alert("Dodaj plik");
      }
  };



  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  const filepath = acceptedFiles.map(file => (
    <div id={file.path}>
      {file.path} - {file.size} bytes
    </div>
  ));



  useEffect(() => {
    
  }, []);

  return (
    <>
      <div className="file-container">

        <div {...getRootProps({style})}>
          <Button className="mr-3 float-left" type="button" onClick={open}>Wybierz plik</Button>
          {filepath.length === 0 ? null : <Button className="float-left" onClick={()=>addFile()}>Dodaj</Button>}
          <input {...getInputProps()} />
          <div>{filepath.length === 0 ? "Przenies i upuść" : filepath}</div>
          {uploading === true ? <ProgressBar bgcolor={"#6a1b9a"} completed={progress}></ProgressBar> : null}

          </div>
      </div>
    </>
  );
}


export default FileAdding;