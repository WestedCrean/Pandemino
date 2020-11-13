const getStreamRole = (userRole) => {
    switch (userRole) {
        case 'lecturer':
            return 'publisher'
            break
        default:
            return 'consumer'
    }
}

export { getStreamRole }