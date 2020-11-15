import React from "react"
import { DefaultToast } from "react-toast-notifications"

const toastPrimitive = (appearance, children, ...props) => (
    <div
        className={`alert alert-${appearance} border-${appearance}`}
        role="alert"
    >
        {children}
    </div>
)

const Toast = ({ appearance, children, ...props }) => {
    const mapToClass = {
        info: "primary",
        success: "success",
        error: "danger",
        warning: "warning",
        tip: "light",
    }

    if (appearance in mapToClass) {
        return toastPrimitive(mapToClass[appearance], children)
    }
    return toastPrimitive("primary", children)
}

export default Toast
