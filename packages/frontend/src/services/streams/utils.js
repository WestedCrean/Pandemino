const getStreamRole = (user, lecture) => {
    if (user && lecture) {
        const { lecturer } = lecture
        console.log(`Is lecturer? ${user.email === lecturer.email}`)
        if (user.email === lecturer.email) {
            return "publisher"
        }
    }

    return "consumer"
}

export { getStreamRole }
