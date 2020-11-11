import { useState, useEffect } from 'react'
import { firebaseAuth } from 'services/firebase'


const useAuthState = (firebase, defaultState) => {
    const [auth, setAuth] = useState(defaultState);

    useEffect(() => {
        const unlisten = firebaseAuth.onAuthStateChanged(
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