import * as firebase from "firebase/app";
import "firebase/auth";

const authMethods = {
    signUp: async (email, password) => {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
    },
    signIn: async (email, password) => {
        await firebase
            .auth().signInWithEmailAndPassword(email, password)
    },
    signOut: async () => {
        await firebase.auth().signOut()
    }
}

export { authMethods }
