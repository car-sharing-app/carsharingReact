import managingLogInReducer from "./managingLogInAndSigningUp"
import managingChangingPassword from "./managingChangingPassword"
import managingChangingEmail from "./managingChangingEmail"
import managingChangingNumber from "./managingChangingNumber"
import AddModify from "./AddModify"
import fromTo from "./fromTo"
import newUserFromAdmin from "./newUserFromAdmin"
import NewCar from "./NewCar"
import AddCar from "./AddCar"
import { combineReducers } from "redux"


const rootReducer = combineReducers({
    managingLogInReducer: managingLogInReducer, // it can be just "managingLogInReducer"
    managingChangingPassword: managingChangingPassword,
    managingChangingEmail: managingChangingEmail,
    managingChangingNumber: managingChangingNumber,
    AddModify: AddModify,
    fromTo: fromTo,
    NewCar: NewCar,
    newUserFromAdmin: newUserFromAdmin,
    AddCar: AddCar
})
export default rootReducer