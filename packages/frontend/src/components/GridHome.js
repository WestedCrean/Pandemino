import React, { Fragment, useEffect, useState } from "react"
import { Navbar, ListCourses } from "components"
import AddCourseModal from "./AddCourseModal"
const GridHome = () => {
    return (
        <div class="wrapper">
            <div class="box grid-courses">
                <ListCourses></ListCourses>
            </div>
            <div class="box grid-newCourse">
                <AddCourseModal></AddCourseModal>
            </div>
            <div class="box grid-news">
                Aktualności
                <br />
                *Tutaj będą streamy dodane ostatnio z "naszych wykładów"*
            </div>
            <div class="box grid-incomingStreams">
                Transmisje na żywo <br />
                Tu zobaczymy co będzie
            </div>
        </div>
    )
}

export default GridHome
