const newUserFromAdmin = (state = { newUserUsername: "", newUserPassword: "", newUserPhoneNumber: "", newUserEmail: "" }, action) => {
    switch (action.type) {
        case "newUserUsername":
            return Object.assign({}, state, {
                newUserUsername: action.passedValue
            })
        case "newUserPassword":
            return Object.assign({}, state, {
                newUserPassword: action.passedValue
            })
        case "newUserPhoneNumber":
            return Object.assign({}, state, {
                newUserPhoneNumber: action.passedValue
            })
        case "newUserEmail":
            return Object.assign({}, state, {
                newUserEmail: action.passedValue
            })
        default:
            return state
    }
}
export default newUserFromAdmin