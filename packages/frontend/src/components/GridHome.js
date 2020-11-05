import React, { Fragment, useEffect, useState } from "react"
import { Navbar, ListCourses } from "components"

import ListUsersCourses from "./ListUsersCourses"

const GridHome = () => {
    return (
        <div class="wrapper">
            <div class="box grid-courses">
                <div className="box-label">
                    <div className="box-label-name">TWOJE KURSY</div>
                </div>
                <ListUsersCourses />
            </div>

            <div class="box grid-news">
                <div className="box-label">
                    <div className="box-label-name">AKTUALNOŚCI</div>
                </div>
                TUTAJ SĄ NAJNOWSZE WYKŁADY
            </div>
        </div>
    )
}

export default GridHome
