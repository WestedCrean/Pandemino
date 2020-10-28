import React, { useState } from "react"
import { Modal, Button } from 'react-bootstrap';
import { useAuthContext } from "services/auth"
import ApiService from "services/api"

const AddCourseModal = () => {

    const [courseName, setCourseName] = useState(null);
    const [courseDescription, setCourseDescription] = useState(null);
    const [courseLecturer, setCourseLecturer] = useState(null);     ////need to be get from user table in future

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { accessToken } = useAuthContext();

    const addNewCourse = async () => {

        const streamsRepository = ApiService(accessToken).streams
        const body = { "name" : courseName, "description" : courseDescription , "lecturer" : courseLecturer };
            await streamsRepository.createCourse(body)
                .then(response => console.log(response.data))
                .catch(error => console.log(error));

        window.alert("Dodano nowy wyklad");
        window.location = "/";
        handleClose();
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Dodaj wyklad
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Dodawanie nowego kursu</Modal.Title>
          </Modal.Header>
          <Modal.Body>Podaj niezbedne dane</Modal.Body>
          <form>
            <input type="text" className="form-control" id="name" placeholder="Nazwa wykladu" value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}/>
            <input type="text" className="form-control" id="desctiption" placeholder="Opis wykladu" value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}/>
            <input type="text" className="form-control" id="lecturer" placeholder="Wykladowca" value={courseLecturer}
                    onChange={(e) => setCourseLecturer(e.target.value)}/>
          </form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Anuluj
            </Button>
            <Button type="submit" variant="primary" onClick={addNewCourse}>
              Dodaj
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default AddCourseModal;