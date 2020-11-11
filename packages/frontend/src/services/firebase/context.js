import React, { createContext, useContext } from 'react'
import firebaseApp from './index';

const FirebaseContext = createContext()
const useFirebaseContext = () => useContext(FirebaseContext)

const FirebaseProvider = (props) => (
    <FirebaseContext.Provider value={firebaseApp}>
        {props.children}
    </FirebaseContext.Provider>
);

export { FirebaseContext, useFirebaseContext, FirebaseProvider }