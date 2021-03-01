const managingChangingEmail = (state = { pass: "", newEmail: "" }, action) => {
    switch (action.type) {
        case "passwordChangeEmail":
            return Object.assign({}, state, {
                pass: action.passedValue
            })
        case "newEmailChangeEmail":
            return Object.assign({}, state, {
                newEmail: action.passedValue
            })
        default:
            return state
    }
}
export default managingChangingEmail