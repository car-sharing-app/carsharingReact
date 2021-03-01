const fromTo = (state = { from: "", to: "", place: "", people: "" }, action) => {
    switch (action.type) {
        case "from":
            return Object.assign({}, state, {
                from: action.passedValue
            })
        case "to":
            return Object.assign({}, state, {
                to: action.passedValue
            })
        case "place":
            return Object.assign({}, state, {
                place: action.passedValue
            })
        case "people":
            return Object.assign({}, state, {
                people: action.passedValue
            })
        default:
            return state
    }
}
export default fromTo