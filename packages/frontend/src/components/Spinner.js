import React from 'react'

const Spinner = ({ size }) => (
    <div className="text-center">
        <div className="spinner-border" style={{
            width: `${size}rem`,
            height: `${size}rem`
        }} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
)

export default Spinner