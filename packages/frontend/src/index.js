import React from "react"
import ReactDOM from "react-dom"

import App from "App"
import { AuthProvider } from "services/auth"
import { ToastProvider } from "react-toast-notifications"
import Toast from "components/Toast"
import * as serviceWorker from "serviceWorker"

import "bootstrap/dist/css/bootstrap.min.css"
import "styles/index.scss"

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ToastProvider
                autoDismiss
                autoDismissTimeout={4000}
                components={{ Toast: Toast }}
                placement="bottom-right"
            >
                <App />
            </ToastProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
