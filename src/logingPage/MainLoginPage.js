import React, { Component } from 'react'
import "./mainLoginPage.css"
import TextInput from "./TextInput"
import { useSelector, useDispatch } from "react-redux"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { newData } from "../actions/addData"
import cookie from 'react-cookies'

var cookies = document.cookie
class MainLoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged: false,
            signed: "",
            signingIn: true,
            errorDuringLogin: "",
            errorDuringSigningUp: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.logIn = this.logIn.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    handleChange(e) {
        e.preventDefault()
        this.props.newData("newValueUser", "")
        this.props.newData("newValuePassword", "")
        this.props.newData("newValueUserNew", "")
        this.props.newData("newValuePasswordNew", "")
        this.props.newData("newValuePasswordConfirmNew", "")
        this.props.newData("newValueEmailNew", "")
        this.props.newData("newValuePhoneNew", "")
        var previous = this.state.signingIn
        this.setState({
            signingIn: !previous
        })
    }

    logIn() {
        var login = this.props.user
        var pass = this.props.password
        if (login != "" && pass != "") {
            fetch("http://127.0.0.1:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": login,
                    "password": pass
                })
            })
                .then(response =>
                    response.json()
                )
                .then(data => {
                    console.log(data)
                    if (data.message == "Invalid credentials." || data.message == "Account is not activated. Please check your email.") {
                        this.setState({
                            errorDuringLogin: "Invalid username or password or unactivated account"
                        })
                    }
                    else {
                        var that = this
                        function changeToPanel(callback) {
                            var now = new Date()
                            now.setDate(now.getDate() + 1)
                            console.log("!!!")
                            document.cookie += "role=" + data.role + ";expires=" + now + ";path=/"
                            document.cookie = "token=" + data.accessToken + ";expires=" + now + ";path=/"
                            callback()
                        }
                        var that = this
                        changeToPanel(async function () {
                            that.props.newData("newValueUser", "")
                            that.props.newData("newValuePassword", "")
                            await that.setState({
                                logged: true
                            })
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                }

                )
        }
        else {
            this.setState({
                errorDuringLogin: "At least one field is empty"
            })
        }
    }

    signUp() {
        console.log("ok")
        console.log(this.props)
        var username = this.props.newUser
        var pass = this.props.newPassword
        var passC = this.props.newPasswordConfirm
        var email = this.props.newEmail
        var phone = this.props.newPhone
        if (username != "" && pass != "" && passC != "" && email != "" && phone != "") {
            if (pass == passC) {
                const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                var validEmail = emailRegEx.test(email)
                console.log(email)
                if (validEmail == true) {
                    var onlyNumbers = /^\d+$/
                    var validPhone = onlyNumbers.test(phone)
                    if (validPhone == true) {
                        fetch("http://127.0.0.1:3001/auth/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "username": username,
                                "email": email,
                                "password": pass,
                                "phoneNumber": phone
                            })
                        })
                            .then(response =>
                                response.json()
                            )
                            .then(data => {
                                console.log(data)
                                if (data.errors != undefined) {
                                    var problems = ""
                                    for (let i = 0; i < data.errors.length; i++) {
                                        problems += data.errors[i].message + " "
                                    }
                                    this.setState({
                                        errorDuringSigningUp: problems
                                    })
                                }
                                else {
                                    this.props.newData("newValueUser", "")
                                    this.props.newData("newValuePassword", "")
                                    this.props.newData("newValueUserNew", "")
                                    this.props.newData("newValuePasswordNew", "")
                                    this.props.newData("newValuePasswordConfirmNew", "")
                                    this.props.newData("newValueEmailNew", "")
                                    this.props.newData("newValuePhoneNew", "")
                                    this.setState({
                                        errorDuringLogin: "Click link in email, that was send to your email to activate account",
                                        signingIn: true
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            }

                            )
                    }
                    else {
                        this.setState({
                            errorDuringSigningUp: "Provided phone number may contains only digits"
                        })
                    }
                }
                else {
                    this.setState({
                        errorDuringSigningUp: "Provided email is not valid"
                    })
                }
            }
            else {
                this.setState({
                    errorDuringSigningUp: "Provided passwords are different"
                })
            }
        }
        else {
            this.setState({
                errorDuringSigningUp: "At least one field is empty"
            })
        }
    }

    render() {
        // console.log(this.state.logged)
        if (this.state.logged === true) {
            console.log("!Q!!!!!!")
            var role = cookie.select(/^role$/)
            if (role.role != "admin") {
                return (<Redirect to="/userPanel" />)
            }
            else {
                return (<Redirect to="/adminPanel" />)
            }

        }
        else if (document.cookie != "") {
            var role = cookie.select(/^role$/)
            if (role.role != "admin") {
                return (<Redirect to="/userPanel" />)
            }
            else {
                return (<Redirect to="/adminPanel" />)
            }
        }
        else {
            // console.log("xxx")
            return (
                <div id="fullScreen">

                    {this.state.signingIn ?
                        <div id="logIn">
                            <img src={process.env.PUBLIC_URL + "/logo.png"} />
                            <p>Log In</p>
                            <p id="errorP">{this.state.errorDuringLogin}</p>
                            <TextInput id="userNameLogin" typeToRedux="newValueUser" label="Username" key={1} />
                            <TextInput id="PasswordLogin" typeToRedux="newValuePassword" label="Password" type="password" key={2} />
                            <div className="button"><a className="buttonA" href="####" onClick={this.logIn}>Log In</a></div>
                            <div className="button"><a className="buttonA" id="switch" href="####" onClick={this.handleChange}>Or Sign Up</a></div>
                        </div>
                        :
                        <div id="signUp">
                            <img src={process.env.PUBLIC_URL + "/logo.png"} />
                            <p>Sign Up</p>
                            <p id="errorP">{this.state.errorDuringSigningUp}</p>
                            <TextInput id="userNameSignUp" typeToRedux="newValueUserNew" label="Username" key={3} />
                            <TextInput id="PasswordSignUp" typeToRedux="newValuePasswordNew" label="Password" type="password" key={4} />
                            <TextInput id="passwordConfirmSignUp" typeToRedux="newValuePasswordConfirmNew" label="Confirm Password" type="password" key={5} />
                            <TextInput id="emailSignUp" typeToRedux="newValueEmailNew" label="Email" key={6} />
                            <TextInput id="phoneSignUp" typeToRedux="newValuePhoneNew" label="Phone" key={7} />
                            <div className="button"><a className="buttonA" href="####" onClick={this.signUp}>Sign Up</a></div>
                            <div className="button"><a className="buttonA" id="switch" href="####" onClick={this.handleChange}>Or Log In</a></div>
                        </div>
                    }
                </div>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        user: state.managingLogInReducer.user,
        password: state.managingLogInReducer.password,
        newUser: state.managingLogInReducer.newUser,
        newPassword: state.managingLogInReducer.newPassword,
        newPasswordConfirm: state.managingLogInReducer.newPasswordConfirm,
        newEmail: state.managingLogInReducer.newEmail,
        newPhone: state.managingLogInReducer.newPhone
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        newData: (typeToRedux, data) => dispatch(newData(typeToRedux, data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainLoginPage)
