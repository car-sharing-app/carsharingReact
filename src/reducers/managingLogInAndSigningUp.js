const managingLogInReducer = (state = { user: "", password: "", newUser: "", newPassword: "", newPasswordConfirm: "", newEmail: "", newPhone: "" }, action) => {
    switch (action.type) {
        case "newValueUser":
            return Object.assign({}, state, {
                user: action.passedValue
            })
        case "newValuePassword":
            return Object.assign({}, state, {
                password: action.passedValue
            })
        case "newValueUserNew":
            return Object.assign({}, state, {
                newUser: action.passedValue
            })
        case "newValuePasswordNew":
            return Object.assign({}, state, {
                newPassword: action.passedValue
            })
        case "newValuePasswordConfirmNew":
            return Object.assign({}, state, {
                newPasswordConfirm: action.passedValue
            })
        case "newValueEmailNew":
            return Object.assign({}, state, {
                newEmail: action.passedValue
            })
        case "newValuePhoneNew":
            return Object.assign({}, state, {
                newPhone: action.passedValue
            })
        default:
            return state
    }
}
export default managingLogInReducer