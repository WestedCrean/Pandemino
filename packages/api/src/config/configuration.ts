type AppConfiguration = {
    port: number
    env: string
    firebaseConfig: {
        type: string
        projectId: string
        privateKeyId: string
        privateKey: string
        clientEmail: string
        clientId: string
        authUri: string
        tokenUri: string
        authProviderX509CertUrl: string
        clientC509CertUrl: string
    }
}

const config = (): AppConfiguration => ({
    port: parseInt(process.env.PORT, 10) || 5000,
    env: process.env.NODE_ENV || "development",
    firebaseConfig: {
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
    },
})

export default config
