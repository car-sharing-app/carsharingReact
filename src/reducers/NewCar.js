const newCar = (state = { newCarBrand: "", newCarModel: "", newCarDoors: "", newCarPersons: "" }, action) => {
    switch (action.type) {
        case "newCarBrand":
            return Object.assign({}, state, {
                newCarBrand: action.passedValue
            })
        case "newCarModel":
            return Object.assign({}, state, {
                newCarModel: action.passedValue
            })
        case "newCarDoors":
            return Object.assign({}, state, {
                newCarDoors: action.passedValue
            })
        case "newCarPersons":
            return Object.assign({}, state, {
                newCarPersons: action.passedValue
            })
        default:
            return state
    }
}
export default newCar