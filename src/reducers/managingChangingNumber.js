const managingChangingNumber = (state = { phone: "" }, action) => {
    switch (action.type) {
        case "newPhoneChangingNumber":
            return Object.assign({}, state, {
                phone: action.passedValue
            })
        default:
            return state
    }
}
export default managingChangingNumber