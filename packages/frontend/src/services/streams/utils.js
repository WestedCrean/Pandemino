const getStreamRole = (user) => {
    const userRole = user.role
    switch (userRole) {
        case 'lecturer':
            return 'publisher'
            break
        default:
            return 'consumer'
    }
}

export { getStreamRole }