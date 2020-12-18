var firebase = require("firebase-admin");

const firebaseConfig = {
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECTID,
    privateKeyId: process.env.FIREBASE_KEYID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_X509_AUTH_PROVIDER,
    clientC509CertUrl: process.env.FIREBASE_X509_CERT_URL,
}

admin = firebase.initializeApp({
    credential: firebase.credential.cert(firebaseConfig),
    databaseURL: "https://pandemino.firebaseio.com",
})

module.exports = admin