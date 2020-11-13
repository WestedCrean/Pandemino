import React from 'react'

const toastPrimitive = (appearance, children) => (
    <div className={`alert alert-${appearance} border-${appearance} margin-toast`} role="alert">
        {children}
    </div>
)

const Toast = ({ appearance, children }) => {
    const mapToClass = {
        'info': 'primary',
        'success': 'success',
        'error': 'danger',
        'warning': 'warning',
        'tip': 'light'
    }

    if (appearance in mapToClass) {
        return toastPrimitive(mapToClass[appearance], children)
    }
    return toastPrimitive('primary', children)
}

export default Toast