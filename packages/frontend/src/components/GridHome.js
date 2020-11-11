import React, { Fragment, useEffect, useState } from "react"
import { Navbar, ListCourses, ListUsersCourses } from "components"
import NewsList from "./NewsList"

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
                <NewsList></NewsList>
            </div>
        </div>
    )
}

export default GridHome
