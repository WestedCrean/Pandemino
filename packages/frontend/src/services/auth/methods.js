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
      },
    onAuthStateChange: async (setUser) => {
            firebase.auth().onAuthStateChanged(async function(user) {
                if (user) {
                    let displayName = user.displayName;
                    let email = user.email;
                    let accessToken = await user.getIdToken()
                    setUser({ 
                        displayName,
                        email
                    }, accessToken)
                }
            })
        
    }
}

export {authMethods}
