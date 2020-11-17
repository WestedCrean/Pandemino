import React, { useEffect } from "react";
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseAuth } from "services/firebase"


const FileAdding = () => {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [fileUpload, setFileUpload] = React.useState(null);
  const [fileRef1, setFileRef] = React.useState(null);

  const [users, setUsers] = React.useState([]);

  const addFile = async () => {
      
      if(fileUpload != null){
        const file = fileUpload;
        const storageRef = firebaseAuth.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);

        setFileRef(fileRef.fullPath);
        window.alert("Dodano plik");
      }else {
        window.alert("Dodaj plik");
      }
  };

  //FOR EXAMPLE
  const remove = async () => {
      console.log(fileRef1)
      const storageRef = firebaseAuth.storage().ref();
      const fileRef = storageRef.child(fileRef1)
      await fileRef.delete();
  }

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