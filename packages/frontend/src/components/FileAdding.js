import React, { useEffect } from "react";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseAuth } from "services/firebase"


const FileAdding = () => {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [fileUpload, setFileUpload] = React.useState(null);

  const [users, setUsers] = React.useState([]);

  const addFile = async () => {
      
      if(fileUpload != null){
        const file = fileUpload;
        const storageRef = firebaseAuth.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL());

        window.alert("Dodano plik");
        //window.location("/")
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
        <input type="file" onChange={handleChange}/>
        <button onClick={addFile}>Dodaj</button>
    </>
  );
}

export default FileAdding;