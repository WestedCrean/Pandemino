import React from "react"

function ContextButtonContainer({ children }) {
    return (
        <div className="container d-flex flex-row-reverse justify-content-start reverse context-button-container context-button-container">
            {children}
        </div>
    )
}

export default ContextButtonContainer
