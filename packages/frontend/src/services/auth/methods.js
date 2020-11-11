import firebase from "services/firebase"

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
