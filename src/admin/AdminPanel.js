import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import "../user/userPanel.css"
import Sidebar from "../user/Sidebar"
import cookie from 'react-cookies'
import RightContent from "../user/RightContent"
export default class AdminPanel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            first: false,
            checkedTwoTimes: false,
            logged2: true,
            rightTitle: "Choose action from left sidebar",
            rightContent: null,
        }

        this.logOut = this.logOut.bind(this)
        this.checkCookiesOneMoreTime = this.checkCookiesOneMoreTime.bind(this)
        this.manageUsers = this.manageUsers.bind(this)
        this.addUser = this.addUser.bind(this)
        this.allCarTypes = this.allCarTypes.bind(this)
        this.addCarType = this.addCarType.bind(this)
        this.all = this.all.bind(this)
        this.allCarsAndReservations = this.allCarsAndReservations.bind(this)
        this.addCar = this.addCar.bind(this)
        this.all2 = this.all2.bind(this)
    }

    all() {
        this.setState({
            rightTitle: "All Car Types",
            rightContent: "allCTypes"
        })
    }

    all2() {
        this.setState({
            rightTitle: "All Cars And Reservations",
            rightContent: "allCarsAndR"
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

    manageUsers() {
        this.setState({
            rightTitle: "Manage Users",
            rightContent: "manageU"
        })
    }

    addUser() {
        this.setState({
            rightTitle: "Add User",
            rightContent: "addU"
        })
    }

    allCarTypes() {
        this.setState({
            rightTitle: "All Car Types",
            rightContent: "allCTypes"
        })
    }

    addCarType() {
        this.setState({
            rightTitle: "Add Car Type",
            rightContent: "addCType"
        })
    }

    allCarsAndReservations() {
        this.setState({
            rightTitle: "All Cars And Reservations",
            rightContent: "allCarsAndR"
        })
    }

    addCar() {
        this.setState({
            rightTitle: "Add Car",
            rightContent: "addC"
        })
    }

    render() {
        var that = this
        const items = [
            {
                name: 'users',
                label: 'Users',
                items: [
                    { name: "addAdmin", label: "Add Admin", onC: that.addUser },
                    { name: "manageUsers", label: "Manage Users", onC: that.manageUsers },
                ]
            },
            {
                name: 'carsAndReservations',
                label: 'Cars And Reservations',
                items: [
                    { name: 'addCarType', label: 'Add Car Type', onC: that.addCarType },
                    { name: 'allCarTypesAllowedInCompany', label: 'All Car Types Allowed In Company', onC: that.allCarTypes },
                    { name: 'allCarsAndReservations', label: 'All Cars And Reservations', onC: that.allCarsAndReservations },
                    { name: 'addCar', label: 'Add Car', onC: that.addCar },
                ],
            },
            {
                name: 'myAccount',
                label: 'My Account',
                items: [
                    { name: "logout", label: "Logout", onC: that.logOut },
                ]
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
                        <RightContent title={this.state.rightTitle} contentType={this.state.rightContent} funcToDelete={this.logOut} aboutLicence={this.state.dataAboutDrivingLicence} goToMyReservations={this.myR} goToAllCars={this.all} goToAllCars2={this.all2} />
                    </div>
                </div>
            )
        }
    }
}