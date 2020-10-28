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
    onAuthStateChange: async () => {
        new Promise( (resolve, reject) => {
            firebase.auth().onAuthStateChanged(async function(user) {
                if (user) {
                    let displayName = user.displayName;
                    let email = user.email;
                    let providerData = user.providerData
                    let accessToken = await user.getIdToken()
                    resolve({
                        user: { 
                            displayName,
                            email,
                            providerData
                        },
                        accessToken,
                        loggedIn: true
                    })
                } else {
                    reject("no user is logged in")
                }
            })
        })
    }
}

export {authMethods}
