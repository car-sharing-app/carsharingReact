import React, { Component } from 'react'
import TextInput from ".././logingPage/TextInput"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { newData } from "../actions/addData"
import cookie from "react-cookies"
import "./addMod.css"

class AddingOrModifyingLicence extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: this.props.beginingData,
            key: "start5",
            info: ""
        }
        if (this.state.data.address != undefined) {
            this.props.newData("Aboutme", this.state.data.aboutMe)
            this.props.newData("Addressline1", this.state.data.address.addressLine1)
            this.props.newData("Addressline2", this.state.data.address.addressLine2)
            this.props.newData("City", this.state.data.address.city)
            this.props.newData("Zipcode", this.state.data.address.zipCode)
            this.props.newData("FirstName", this.state.data.drivingLicense.firstName)
            this.props.newData("MiddleName", this.state.data.drivingLicense.middleName)
            this.props.newData("LastName", this.state.data.drivingLicense.lastName)
            this.props.newData("BirthDate", this.state.data.drivingLicense.birthDate)
            this.props.newData("BirthPlace", this.state.data.drivingLicense.birthPlace)
            this.props.newData("ValidFrom", this.state.data.drivingLicense.validFrom)
            this.props.newData("ValidTo", this.state.data.drivingLicense.validTo)
            this.props.newData("DrivingLicenceNumber", this.state.data.drivingLicense.drivingLicenseNumber)
            this.props.newData("PESEL", this.state.data.drivingLicense.pesel)
        }

        this.handleAddUpdate = this.handleAddUpdate.bind(this)
    }

    handleAddUpdate() {
        console.log(this.props)
        var dataBig = {
            "aboutMe": this.props.aboutMe,
            "address": {
                "addressLine1": this.props.a1,
                "addressLine2": this.props.a2,
                "city": this.props.city,
                "zipCode": this.props.zipCode
            },
            "drivingLicense": {
                "firstName": this.props.fName,
                "middleName": this.props.mName,
                "lastName": this.props.lName,
                "birthDate": this.props.bDate,
                "birthPlace": this.props.bPlace,
                "validFrom": this.props.vFrom,
                "validTo": this.props.vTo,
                "drivingLicenseNumber": this.props.dLNumber,
                "pesel": this.props.pesel
            }
        }
        console.log(dataBig)
        // console.log(data)
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
                if (data.address == undefined) {
                    fetch("http://localhost:3001/profile/me", {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + token.token
                        },
                        body: JSON.stringify(dataBig)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.errors != undefined) {
                                let inf = ""
                                for (let i = 0; i < data.errors.length; i++) {
                                    inf += data.errors[i].message + ", "
                                }
                                inf = inf.slice(0, -2)
                                this.setState({
                                    info: inf
                                })
                            }
                            else {
                                this.setState({
                                    info: "Operation succeed"
                                })
                            }
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
                else {
                    fetch("http://localhost:3001/profile/me", {
                        method: 'PUT', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + token.token
                        },
                        body: JSON.stringify(dataBig)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.errors != undefined) {
                                this.setState({
                                    info: "Inserted data are not valid"
                                })
                            }
                            else {
                                this.setState({
                                    info: "Operation succeed"
                                })
                            }
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    static propTypes = {
        beginingData: PropTypes.object
    };

    static defaultProps = {
        beginingData: {
            "aboutMe": "This is my profile description. It can also be null.",
            "address": {
                "addressLine1": "",
                "addressLine2": null,
                "city": "",
                "zipCode": ""
            },
            "drivingLicense": {
                "firstName": "",
                "middleName": "",
                "lastName": "",
                "birthDate": "",
                "birthPlace": "",
                "validFrom": "",
                "validTo": "",
                "drivingLicenseNumber": "",
                "pesel": ""
            }
        }
    };

    render() {
        if (this.state.data.drivingLicense != undefined) {
            var bDate = new Date(this.state.data.drivingLicense.birthDate)
            var year = bDate.getFullYear();
            var month = bDate.getMonth() + 1;
            var dt = bDate.getDate();
            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            var bDateFormated = year + '-' + month + '-' + dt
            var fDate = new Date(this.state.data.drivingLicense.validFrom)
            var year2 = fDate.getFullYear();
            var month2 = fDate.getMonth() + 1;
            var dt2 = fDate.getDate();
            if (dt2 < 10) {
                dt2 = '0' + dt2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            var fDateFormated = year2 + '-' + month2 + '-' + dt2
            var tDate = new Date(this.state.data.drivingLicense.validTo)
            var year3 = tDate.getFullYear();
            var month3 = tDate.getMonth() + 1;
            var dt3 = fDate.getDate();
            if (dt3 < 10) {
                dt3 = '0' + dt3;
            }
            if (month3 < 10) {
                month3 = '0' + month3;
            }
            var tDateFormated = year3 + '-' + month3 + '-' + dt3
            return (
                <div id="scaleDown">
                    <p> Insert All Data </p>
                    <p id="error_info2">{this.state.info}</p>
                    <div id="mainForm" key={this.state.key}>
                        <div class="form">
                            <TextInput id="Aboutme" typeToRedux="Aboutme" label="About me" value={this.state.data.aboutMe} />
                            <TextInput id="Addressline1" typeToRedux="Addressline1" label="Address - line 1" value={this.state.data.address.addressLine1} />
                            <TextInput id="Addressline2" typeToRedux="Addressline2" label="Address - line 2" value={this.state.data.address.addressLine2} />
                            <TextInput id="City" typeToRedux="City" label="City" value={this.state.data.address.city} />
                            <TextInput id="Zipcode" typeToRedux="Zipcode" label="Zipcode" value={this.state.data.address.zipCode} />
                            <TextInput id="FirstName" typeToRedux="FirstName" label="First Name" value={this.state.data.drivingLicense.firstName} />
                            <TextInput id="MiddleName" typeToRedux="MiddleName" label="Middle Name" value={this.state.data.drivingLicense.middleName} />
                            <TextInput id="LastName" typeToRedux="LastName" label="Last Name" value={this.state.data.drivingLicense.lastName} />
                        </div>
                        <div class="form">
                            <TextInput id="BirthDate" typeToRedux="BirthDate" label="Birth Date" type="date" functionToChangeType={true} value={bDateFormated} />
                            <TextInput id="BirthPlace" typeToRedux="BirthPlace" label="Birth Place" value={this.state.data.drivingLicense.birthPlace} />
                            <TextInput id="ValidFrom" typeToRedux="ValidFrom" label="Valid From" type="date" functionToChangeType={true} value={fDateFormated} />
                            <TextInput id="ValidTo" typeToRedux="ValidTo" label="Valid To" type="date" functionToChangeType={true} value={tDateFormated} />
                            <TextInput id="DrivingLicenceNumber" typeToRedux="DrivingLicenceNumber" label="Driving Licence Number" value={this.state.data.drivingLicense.drivingLicenseNumber} />
                            <TextInput id="PESEL" typeToRedux="PESEL" label="PESEL" value={this.state.data.drivingLicense.pesel} />
                        </div>
                    </div>
                    <div className="button"><a className="buttonA" href="####" onClick={this.handleAddUpdate}>Add/Update</a></div>
                </div>
            )
        }
        else {
            return (
                <div id="scaleDown">
                    <p> Insert All Data </p>
                    <p id="error_info2">{this.state.info}</p>
                    <div id="mainForm" key={this.state.key}>
                        <div class="form">
                            <TextInput id="Aboutme" typeToRedux="Aboutme" label="About me" />
                            <TextInput id="Addressline1" typeToRedux="Addressline1" label="Address - line 1" />
                            <TextInput id="Addressline2" typeToRedux="Addressline2" label="Address - line 2" />
                            <TextInput id="City" typeToRedux="City" label="City" />
                            <TextInput id="Zipcode" typeToRedux="Zipcode" label="Zipcode" />
                            <TextInput id="FirstName" typeToRedux="FirstName" label="First Name" />
                            <TextInput id="MiddleName" typeToRedux="MiddleName" label="Middle Name" />
                            <TextInput id="LastName" typeToRedux="LastName" label="Last Name" />
                        </div>
                        <div class="form">
                            <TextInput id="BirthDate" typeToRedux="BirthDate" label="Birth Date" type="date" functionToChangeType={true} />
                            <TextInput id="BirthPlace" typeToRedux="BirthPlace" label="Birth Place" />
                            <TextInput id="ValidFrom" typeToRedux="ValidFrom" label="Valid From" type="date" functionToChangeType={true} />
                            <TextInput id="ValidTo" typeToRedux="ValidTo" label="Valid To" type="date" functionToChangeType={true} />
                            <TextInput id="DrivingLicenceNumber" typeToRedux="DrivingLicenceNumber" label="Driving Licence Number" />
                            <TextInput id="PESEL" typeToRedux="PESEL" label="PESEL" />
                        </div>
                    </div>
                    <div className="button"><a className="buttonA" href="####" onClick={this.handleAddUpdate}>Add/Update</a></div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        aboutMe: state.AddModify.about,
        a1: state.AddModify.a1,
        a2: state.AddModify.a2,
        city: state.AddModify.city,
        zipCode: state.AddModify.zip,
        fName: state.AddModify.fN,
        mName: state.AddModify.mN,
        lName: state.AddModify.lN,
        bDate: state.AddModify.bDate,
        bPlace: state.AddModify.bPlace,
        vFrom: state.AddModify.vFrom,
        vTo: state.AddModify.vTo,
        dLNumber: state.AddModify.dLicenceNumber,
        pesel: state.AddModify.PESEL
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        newData: (typeToRedux, data) => dispatch(newData(typeToRedux, data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddingOrModifyingLicence)
