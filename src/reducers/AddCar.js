const AddCar = (state = { newCarAddress: "", AddCarCity: "", AddCarZipCode: "", AddCarPrizePerDay: "" }, action) => {
    switch (action.type) {
        case "AddCarAddress":
            return Object.assign({}, state, {
                newCarAddress: action.passedValue
            })
        case "AddCarCity":
            return Object.assign({}, state, {
                AddCarCity: action.passedValue
            })
        case "AddCarZipCode":
            return Object.assign({}, state, {
                AddCarZipCode: action.passedValue
            })
        case "AddCarPrizePerDay":
            return Object.assign({}, state, {
                AddCarPrizePerDay: action.passedValue
            })
        default:
            return state
    }
}
export default AddCar