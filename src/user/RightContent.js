import React, { Component } from 'react'
import PropTypes from "prop-types"
import ChangePassword from "./ChangePassword"
import ChangeEmail from "./ChangeEmail"
import ChangeNumber from "./ChangeNumber"
import AddingOrModifyingLicence from "./AddingOrModifyingLicence"
import RentACar from "./RentACar"
import { connect } from "react-redux"
import { newData } from "../actions/addData"
import cookie from 'react-cookies'
import "./rightContent.css"
import MyReservations from "./MyReservations"
import ManageUsers from "../admin/ManageUsers.js"
import AddUser from "../admin/AddUser.js"
import AllCarTypes from "../admin/AllCarTypes.js"
import AddCarType from "../admin/AddCarType.js"
import AllCarsAndReservations from "../admin/AllCarsAndReservations.js"
import AddCar from "../admin/AddCar.js"


class RightContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errorInfo1: "",
            errorInfo2: "",
            errorInfo3: "",
            errorInfo4: "",
            keyForPassword: "start",
            keyForEmail: "start2",
            keyForNumber: "start3"
        }
        this.handleChange = this.handleChange.bind(this)
        this.reset = this.reset.bind(this)
        var that = this
        // this.removing5s = setInterval(function () {
        //     if (that.state != undefined) {
        //         that.setState({
        //             errorInfo1: "",
        //             errorInfo2: "",
        //             errorInfo3: "",
        //             errorInfo4: "",
        //         })
        //     }
        // }, 5000)
    }

    reset() {
        this.setState({
            errorInfo1: "",
            errorInfo2: "",
            errorInfo3: "",
            errorInfo4: "",
        })
    }

    async handleChange() {
        if (this.props.contentType == "changeP") {
            var token = cookie.select(/^token$/)
            console.log(token)
            var oldPassword = this.props.oldPass
            var newPassword = this.props.newPass
            var dataToSend = {
                oldPassword: oldPassword,
                newPassword: newPassword
            }
            dataToSend = JSON.stringify(dataToSend)
            console.log(dataToSend)
            var toAuth = "Bearer " + token
            fetch('http://localhost:3001/user/me/password', {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token.token
                },
                body: dataToSend
            })
                .then(response => response.text())
                .then(data => {
                    data = JSON.parse(data)
                    console.log(data)
                    if (data.message != undefined) {
                        if (data.message == "Unauthorized!") {
                            this.setState({
                                errorInfo1: "Something went wrong with authorization"
                            })
                        }
                        else {
                            this.setState({
                                errorInfo1: data.message,
                            })
                            this.props.newData("oldPasswordChange", "")
                            this.props.newData("newPasswordChange", "")
                            var previous = this.state.keyForPassword
                            previous += "1"
                            this.setState({
                                keyForPassword: previous
                            })
                        }
                    }
                    if (data.errors != undefined) {
                        var allErr = ""
                        for (let i = 0; i < data.errors.length; i++) {
                            allErr += data.errors[i].message
                        }
                        this.setState({
                            errorInfo1: allErr
                        })
                    }


                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (this.props.contentType == "changeE") {
            var token = cookie.select(/^token$/)
            console.log(token)
            var password = this.props.passToChangeEmail
            var email = this.props.newEmail
            var dataToSend = {
                password: password,
                email: email
            }
            dataToSend = JSON.stringify(dataToSend)
            console.log(dataToSend)
            var toAuth = "Bearer " + token
            fetch('http://localhost:3001/user/me/email', {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token.token
                },
                body: dataToSend
            })
                .then(response => response.text())
                .then(data => {
                    data = JSON.parse(data)
                    console.log(data)
                    if (data.message != undefined) {
                        if (data.message == "Unauthorized!") {
                            this.setState({
                                errorInfo2: "Something went wrong with authorization"
                            })
                        }
                        else {
                            this.setState({
                                errorInfo2: data.message,
                            })
                            this.props.newData("passwordChangeEmail", "")
                            this.props.newData("newEmailChangeEmail", "")
                            var previous = this.state.keyForEmail
                            previous += "1"
                            this.setState({
                                keyForEmail: previous
                            })
                        }
                    }
                    if (data.errors != undefined) {
                        var allErr = ""
                        for (let i = 0; i < data.errors.length; i++) {
                            allErr += data.errors[i].message
                        }
                        this.setState({
                            errorInfo2: allErr
                        })
                    }


                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (this.props.contentType == "changeN") {
            var token = cookie.select(/^token$/)
            console.log(token)
            var newPhone = this.props.newPhone
            var dataToSend = {
                phoneNumber: newPhone
            }
            dataToSend = JSON.stringify(dataToSend)
            console.log(dataToSend)
            var toAuth = "Bearer " + token
            fetch('http://localhost:3001/user/me/phone', {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token.token
                },
                body: dataToSend
            })
                .then(response => response.text())
                .then(data => {
                    data = JSON.parse(data)
                    console.log(data)
                    if (data.message != undefined) {
                        if (data.message == "Unauthorized!") {
                            this.setState({
                                errorInfo3: "Something went wrong with authorization"
                            })
                        }
                        else {
                            this.setState({
                                errorInfo3: data.message,
                            })
                            this.props.newData("newPhoneChangingNumber", "")
                            var previous = this.state.keyForNumber
                            previous += "1"
                            this.setState({
                                keyForNumber: previous
                            })
                        }
                    }
                    if (data.errors != undefined) {
                        var allErr = ""
                        for (let i = 0; i < data.errors.length; i++) {
                            allErr += data.errors[i].message
                        }
                        this.setState({
                            errorInfo3: allErr
                        })
                    }


                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (this.props.contentType == "deleteA") {
            var token = cookie.select(/^token$/)
            console.log(token)
            var toAuth = "Bearer " + token.token
            fetch("http://localhost:3001/user/me", {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': toAuth
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.props.funcToDelete()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        contentType: PropTypes.string,
        funcToDelete: PropTypes.func.isRequired,
        aboutLicence: PropTypes.object,
        goToMyReservations: PropTypes.func.isRequired,
        goToAllCars: PropTypes.func.isRequired,
        goToAllCars2: PropTypes.func.isRequired
    };

    static defaultProps = {
        contentType: null,
        aboutLicence: null
    };


    render() {
        if (this.props.contentType == null) {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                </div>
            )
        }
        else if (this.props.contentType == "changeP") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <div id="right2">
                        <p id="error_info" key="firstP">{this.state.errorInfo1}</p>
                        <ChangePassword key={this.state.keyForPassword} />
                        <div className="button"><a className="buttonA" href="####" onClick={this.handleChange}>Change Password</a></div>
                    </div>
                </div>
            )
        }
        else if (this.props.contentType == "changeE") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <div id="right2">
                        <p id="error_info" key="secondP">{this.state.errorInfo2}</p>
                        <ChangeEmail key={this.state.keyForEmail} />
                        <div className="button"><a className="buttonA" href="####" onClick={this.handleChange}>Change Email</a></div>
                    </div>
                </div>
            )
        }

        else if (this.props.contentType == "changeN") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <div id="right2">
                        <p id="error_info" key="thirdP">{this.state.errorInfo3}</p>
                        <ChangeNumber key={this.state.keyForNumber} />
                        <div className="button"><a className="buttonA" href="####" onClick={this.handleChange}>Change Number</a></div>
                    </div>
                </div>
            )
        }

        else if (this.props.contentType == "changeN") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <div id="right2">
                        <p id="error_info" key="thirdP">{this.state.errorInfo3}</p>
                        <ChangeNumber key={this.state.keyForNumber} />
                        <div className="button"><a className="buttonA" href="####" onClick={this.handleChange}>Change Number</a></div>
                    </div>
                </div>
            )
        }

        else if (this.props.contentType == "deleteA") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <div id="right2">
                        <p id="error_info" key="thirdP">{this.state.errorInfo4}</p>
                        <div className="button"><a className="buttonA" href="####" onClick={this.handleChange}>Delete Account</a></div>
                    </div>
                </div>
            )
        }
        else if (this.props.contentType == "myL") {
            if (this.props.aboutLicence.drivingLicense != undefined) {
                var date = new Date()
                var dateOfBirthString = date.toDateString(this.props.aboutLicence.drivingLicense.birthDate)
                var dateOfValidFromString = date.toDateString(this.props.aboutLicence.drivingLicense.validFrom)
                var dateOfValidToString = date.toDateString(this.props.aboutLicence.drivingLicense.validTo)
                return (
                    <div>
                        <p id="title">{this.props.title}</p>
                        <div id="right2">
                            <p> <span> Names and Surname: </span> {this.props.aboutLicence.drivingLicense.firstName} {this.props.aboutLicence.drivingLicense.middleName} {this.props.aboutLicence.drivingLicense.lastName}</p>
                            <p> <span>PESEL: </span> {this.props.aboutLicence.drivingLicense.pesel}</p>
                            <p> <span> Birth: </span> {dateOfBirthString}, {this.props.aboutLicence.drivingLicense.birthPlace}</p>
                            <p><span>Address: </span> {this.props.aboutLicence.address.addressLine1} {this.props.aboutLicence.address.addressLine2}  {this.props.aboutLicence.address.city}  {this.props.aboutLicence.address.zipCode}</p>
                            <p> <span>Driving Licence Number: </span>{this.props.aboutLicence.drivingLicense.drivingLicenseNumber}</p>
                            <p><span>Valid: </span> {dateOfValidFromString} - {dateOfValidToString}</p>
                            <p><span>Info about Me: </span>{this.props.aboutLicence.aboutMe}</p>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <p id="title">{this.props.title}</p>
                        <p>You need to add driving licence. You can do it in "Add/Modify Driving Licence"</p>
                    </div>
                )
            }
        }
        else if (this.props.contentType == "addL") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <AddingOrModifyingLicence beginingData={this.props.aboutLicence} />
                </div>
            )
        }
        else if (this.props.contentType == "rentCar") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <RentACar back={this.props.goToMyReservations} />
                </div>
            )
        }
        else if (this.props.contentType == "myR") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <MyReservations />
                </div>
            )
        }
        else if (this.props.contentType == "manageU") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <ManageUsers />
                </div>
            )
        }
        else if (this.props.contentType == "addU") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <AddUser />
                </div>
            )
        }
        else if (this.props.contentType == "allCTypes") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <AllCarTypes />
                </div>
            )
        }
        else if (this.props.contentType == "addCType") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <AddCarType back={this.props.goToAllCars} />
                </div>
            )
        }
        else if (this.props.contentType == "allCarsAndR") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <AllCarsAndReservations back={this.props.goToAllCars} />
                </div>
            )
        }
        else if (this.props.contentType == "addC") {
            return (
                <div>
                    <p id="title">{this.props.title}</p>
                    <AddCar back={this.props.goToAllCars2} />
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        oldPass: state.managingChangingPassword.old,
        newPass: state.managingChangingPassword.new,
        passToChangeEmail: state.managingChangingEmail.pass,
        newEmail: state.managingChangingEmail.newEmail,
        newPhone: state.managingChangingNumber.phone
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        newData: (typeToRedux, data) => dispatch(newData(typeToRedux, data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RightContent)
