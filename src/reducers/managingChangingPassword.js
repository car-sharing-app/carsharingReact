const managingChagingPassword = (state = { old: "", new: "" }, action) => {
    switch (action.type) {
        case "oldPasswordChange":
            return Object.assign({}, state, {
                old: action.passedValue
            })
        case "newPasswordChange":
            return Object.assign({}, state, {
                new: action.passedValue
            })
        default:
            return state
    }
}
export default managingChagingPassword