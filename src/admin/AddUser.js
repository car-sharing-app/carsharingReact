import React, { Component } from 'react'
import TextInput from "../logingPage/TextInput.js"
import { newData } from "../actions/addData.js"
import { connect } from "react-redux"
import cookie from "react-cookies"
import PropTypes from "prop-types"
import "./addUser.css"

class AddUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            invalidForm: "",
            toHelp: "key908"
        }

        this.create = this.create.bind(this)
    }

    create() {
        let user = this.props.username
        let pass = this.props.password
        let phone = this.props.phone
        let email = this.props.email
        let everythingIsOk = true
        let errorInfo = ""
        if (phone.length != 9) {
            console.log("jeden")
            everythingIsOk = false
            errorInfo += "Proper phone number length is 9 characters. "
        }
        const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        if (emailRegex.test(email) != true) {
            everythingIsOk = false
            console.log("dwa")
            errorInfo += "Provided email address is not proper. "
        }
        if (user == "" || pass == "") {
            everythingIsOk = false
            console.log("trzy")
            errorInfo += "Username or password is not provided."
        }
        if (everythingIsOk == false) {
            this.setState({
                invalidForm: errorInfo
            })
        }
        else {
            console.log("!!!!!!!!")
            this.setState({
                invalidForm: ""
            })
            let toSend = {
                "username": user,
                "password": pass,
                "phoneNumber": phone,
                "email": email
            }
            let token = cookie.select(/^token$/)
            let that = this
            fetch("http://localhost:3001/user", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': "Bearer " + token.token

                },
                body: JSON.stringify(toSend)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Success: ", data)
                    if (data.resourceId != undefined) {
                        let previous = this.state.toHelp
                        previous += "next"
                        console.log(previous)
                        this.props.newData("newUserUsername", "")
                        this.props.newData("newUserPassword", "")
                        this.props.newData("newUserPhoneNumber", "")
                        this.props.newData("newUserEmail", "")
                        this.setState({
                            invalidForm: "New admin added",
                            toHelp: previous
                        })

                    }
                    else {
                        let infoToState = ""
                        for (let i = 0; i < data.errors.length; i++) {
                            infoToState += data.errors[i].message
                        }
                        this.setState({
                            invalidForm: infoToState
                        })
                    }
                })
                .catch((error) => {
                    console.log("Error:", error)
                })
        }
    }

    render() {
        return (
            <div id="formForNewUser">
                <p id="error_info">{this.state.invalidForm}</p>
                <div >
                    <TextInput id="Username" typeToRedux="newUserUsername" label="Username" value={this.props.username} key={this.state.toHelp + "1"} />
                    <TextInput id="Password" typeToRedux="newUserPassword" label="Password" type="password" value={this.props.password} key={this.state.toHelp + "2"} />
                    <TextInput id="PhoneNumber" typeToRedux="newUserPhoneNumber" label="Phone Number" type="number" value={this.props.phone} key={this.state.toHelp + "3"} />
                    <TextInput id="Email" typeToRedux="newUserEmail" label="Email" type="email" value={this.props.email} key={this.state.toHelp + "4"} />
                </div>

                <div className="button"><a className="buttonA" href="####" onClick={this.create}>Create</a></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.newUserFromAdmin.newUserUsername,
        password: state.newUserFromAdmin.newUserPassword,
        phone: state.newUserFromAdmin.newUserPhoneNumber,
        email: state.newUserFromAdmin.newUserEmail,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        newData: (typeToRedux, data) => dispatch(newData(typeToRedux, data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddUser)
