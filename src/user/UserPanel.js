import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import "./userPanel.css"
import Sidebar from "./Sidebar"
import cookie from 'react-cookies'
import RightContent from "./RightContent"

export default class UserPanel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            first: false,
            checkedTwoTimes: false,
            logged2: true,
            rightTitle: "Choose action from left sidebar",
            rightContent: null,
            dataAboutDrivingLicence: null
        }

        this.checkCookiesOneMoreTime = this.checkCookiesOneMoreTime.bind(this)
        this.logOut = this.logOut.bind(this)
        this.test = this.test.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changeNumber = this.changeNumber.bind(this)
        this.removeAccount = this.removeAccount.bind(this)
        this.myLicence = this.myLicence.bind(this)
        this.addLicene = this.addLicene.bind(this)
        this.rent = this.rent.bind(this)
        this.myR = this.myR.bind(this)
    }

    myR() {
        console.log("klikniete")
        this.setState({
            rightTitle: "My reservations",
            rightContent: "myR"
        })
    }

    checkCookiesOneMoreTime() {
        var that = this
        setTimeout(function () {
            if (that.state != undefined) {
                if (document.cookie == "") {
                    if (that.state != undefined) {
                        that.setState({
                            checkedTwoTimes: true
                        })
                    }
                }
                else {
                    that.setState({
                        first: false
                    })
                }
            }
        }, 500)
    }

    test() {
        console.log("klikniete")
    }

    changePassword() {
        console.log(this)
        this.setState({
            rightTitle: "Change Password",
            rightContent: "changeP"
        })
    }

    changeEmail() {
        this.setState({
            rightTitle: "Change Email",
            rightContent: "changeE"
        })
    }

    changeNumber() {
        this.setState({
            rightTitle: "Change Number",
            rightContent: "changeN"
        })
    }

    async removeAccount() {
        await this.setState({
            rightTitle: "DeleteAccount",
            rightContent: "deleteA"
        })
    }

    myLicence() {
        var token = cookie.select(/^token$/)
        var url = "http://localhost:3001/profile/me"
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token.token
            }
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    dataAboutDrivingLicence: data
                })
            })
            .then(() => {
                this.setState({
                    rightTitle: "My Driving Licence",
                    rightContent: "myL"
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    addLicene() {
        var token = cookie.select(/^token$/)
        var url = "http://localhost:3001/profile/me"
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token.token
            }
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    dataAboutDrivingLicence: data
                })
                this.setState({
                    rightTitle: "Add Driving Licence",
                    rightContent: "addL"
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    rent() {
        this.setState({
            rightTitle: "Rent a Car",
            rightContent: "rentCar"
        })
    }
    logOut() {
        var token = cookie.select(/^token$/)
        var url = "http://localhost:3001/auth/logout/" + token.token
        console.log(url)
        fetch(url, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                cookie.remove('token', { path: '/' })
                cookie.remove('role', { path: '/' })
            })
            .then(() => {
                this.setState({
                    logged2: false,
                    checkedTwoTimes: true
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        var that = this
        const items = [
            {
                name: 'account',
                label: 'Account',
                items: [
                    { name: "logout", label: "Logout", onC: that.logOut },
                    { name: "changePassword", label: "Change Password", onC: that.changePassword },
                    { name: "changeEmail", label: "Change Email", onC: that.changeEmail },
                    { name: "changeNumber", label: "Change Number", onC: that.changeNumber },
                    { name: "deleteAccount", label: "Delete Account", onC: that.removeAccount },
                ]
            },
            {
                name: 'drivingLicenceProperties',
                label: 'Driving Licence',
                items: [
                    { name: 'myDrivingLicence', label: 'My Driving Licence', onC: that.myLicence },
                    { name: 'addDrivinfLicence', label: 'Add/Modify Driving Licence', onC: that.addLicene },
                ],
            },
            {
                name: 'carRental',
                label: 'Car Rental',
                items: [
                    { name: 'rentACar', label: 'Rent a Car', onC: that.rent },
                    { name: 'myReservations', label: 'My reservations', onC: that.myR, id: "res" }
                ],
            },
        ]
        if (this.state.logged2 == false) {
            // console.log("tutaj")
            return (<Redirect to="/" />)
        }
        else if (document.cookie == "") {
            if (this.state.checkedTwoTimes == false && this.state.first == false) {
                this.checkCookiesOneMoreTime()
                return (<div></div>)
            }
            else {
                return (<Redirect to="/" />)
            }
        }
        else {
            // this.checkCookiesOneMoreTime()
            return (
                <div id="main">
                    <div id="left">
                        <Sidebar items={items} />
                    </div>
                    <div id="right" key="key2">
                        <RightContent title={this.state.rightTitle} contentType={this.state.rightContent} funcToDelete={this.logOut} aboutLicence={this.state.dataAboutDrivingLicence} goToMyReservations={this.myR} />
                    </div>
                </div>
            )
        }
    }
}
