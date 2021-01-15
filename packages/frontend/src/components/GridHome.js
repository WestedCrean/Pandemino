import React, { Fragment, useEffect, useState } from "react"
import { Navbar, ListCourses, ListUsersCourses } from "components"
import NewsList from "./NewsList"

const GridHome = () => {
    return (
        <div className="outer-wrapper">
            <div className="wrapper">
                <div className="box grid-courses">
                    <div className="box-label">
                        <div className="box-label-name">TWOJE KURSY</div>
                    </div>
                    <ListUsersCourses />
                </div>

                <div className="box grid-news">
                    <div className="box-label">
                        <div className="box-label-name">AKTUALNOŚCI</div>
                    </div>
                    <NewsList></NewsList>
                </div>
            </div>
        </div>
    )
}

export default GridHome
