import { useState, useEffect } from 'react'
import firebaseApp from 'services/firebase'


const useAuthState = (firebase, defaultState) => {
    const [auth, setAuth] = useState(defaultState);

    if (firebase === undefined) {
        firebase = firebaseApp
    }
    useEffect(() => {
        const unlisten = firebase.auth().onAuthStateChanged(
            async user => {
                if (user) {
                    let accessToken = await user.getIdToken()
                    setAuth({ user, accessToken })
                } else {
                    setAuth(defaultState)
                }
            },
        );
        return () => {
            unlisten();
        }
    });

    return [auth, setAuth]
}

export { useAuthState }