import React, { useState, useEffect } from "react"

function useTimer(shouldStart) {
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        if (shouldStart) {
            const interval = setInterval(() => {
                setCounter((counter) => counter + 1)
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [shouldStart])

    return counter
}

export { useTimer }
