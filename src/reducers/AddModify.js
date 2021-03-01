const addModify = (state = { about: "", a1: "", a2: "", city: "", zip: "", fN: "", mN: "", lN: "", bDate: "", bPlace: "", vFrom: "", vTo: "", dLicenceNumber: "", PESEL: "" }, action) => {
    switch (action.type) {
        case "Aboutme":
            return Object.assign({}, state, {
                about: action.passedValue
            })
        case "Addressline1":
            return Object.assign({}, state, {
                a1: action.passedValue
            })
        case "Addressline2":
            return Object.assign({}, state, {
                a2: action.passedValue
            })
        case "City":
            return Object.assign({}, state, {
                city: action.passedValue
            })
        case "Zipcode":
            return Object.assign({}, state, {
                zip: action.passedValue
            })
        case "FirstName":
            return Object.assign({}, state, {
                fN: action.passedValue
            })
        case "MiddleName":
            return Object.assign({}, state, {
                mN: action.passedValue
            })
        case "LastName":
            return Object.assign({}, state, {
                lN: action.passedValue
            })
        case "BirthDate":
            return Object.assign({}, state, {
                bDate: action.passedValue
            })
        case "BirthPlace":
            return Object.assign({}, state, {
                bPlace: action.passedValue
            })
        case "ValidFrom":
            return Object.assign({}, state, {
                vFrom: action.passedValue
            })
        case "ValidTo":
            return Object.assign({}, state, {
                vTo: action.passedValue
            })
        case "DrivingLicenceNumber":
            return Object.assign({}, state, {
                dLicenceNumber: action.passedValue
            })
        case "PESEL":
            return Object.assign({}, state, {
                PESEL: action.passedValue
            })
        default:
            return state
    }
}
export default addModify