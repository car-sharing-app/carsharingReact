import React, { Component } from 'react'
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextInput from "../logingPage/TextInput.js"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import cookie from "react-cookies"
import "./addCar.css"
import { newData } from "../actions/addData"
import { connect } from "react-redux"
import PropTypes from "prop-types"

class AddCar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allTypes: [],
            IdOfCurrentSelectedType: null
        }

        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.addCar = this.addCar.bind(this)
    }

    static propTypes = {
        back: PropTypes.func.isRequired,
    };

    addCar() {
        if (this.props.address != "" && this.props.city != "" && this.props.zipCode != "" && this.props.prize != "" && this.state.IdOfCurrentSelectedType != null) {
            let objToSend = {
                address: {
                    addressLine1: this.props.address,
                    addressLine2: null,
                    city: this.props.city,
                    zipCode: this.props.zipCode
                },
                prizePerDay: this.props.prize,
                carId: this.state.IdOfCurrentSelectedType
            }
            console.log(objToSend)
            let token = cookie.select(/^token$/)
            fetch('http://localhost:3001/car-rental', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token.token
                },
                body: JSON.stringify(objToSend)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    this.props.newData("AddCarAddress", "")
                    this.props.newData("AddCarCity", "")
                    this.props.newData("AddCarZipCode", "")
                    this.props.newData("AddCarPrizePerDay", "")
                    this.setState({
                        allTypes: [],
                        IdOfCurrentSelectedType: null
                    })
                    this.props.back()
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    componentDidMount() {
        let token = cookie.select(/^token$/)
        fetch('http://localhost:3001/car', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token.token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.setState({
                    allTypes: data
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    handleSelectChange(event) {
        console.log(event.target.value)
        this.setState({
            IdOfCurrentSelectedType: event.target.value
        })
    }

    render() {

        const MyMenuItem = styled(MenuItem)({
            width: "25vw",
            backgroundColor: "#232337",
        });

        const MySelect = styled(Select)({
            width: "25vw",
            color: "white",
            marginLeft: "20px",
            marginTop: "20px",
            marginBottom: "30px"
        })

        let menuItems = this.state.allTypes.map(function (elem, i) {
            return (
                <MyMenuItem value={elem.id}>TypeID: {elem.id}  {elem.brand} {elem.model} </MyMenuItem>
            )
        })
        return (
            <div id="formForAddingNewCar">
                <FormControl id="addingCarForm">
                    <FormGroup>
                        <TextInput id="Address" typeToRedux="AddCarAddress" label="Address" value={this.props.address} />
                        <TextInput id="City" typeToRedux="AddCarCity" label="City" value={this.props.city} />
                        <TextInput id="ZipCode" typeToRedux="AddCarZipCode" label="ZipCode" value={this.props.zipCode} />
                        <TextInput id="Prize" typeToRedux="AddCarPrizePerDay" label="Prize Per Day" value={this.props.prize} type="number" />
                        <MySelect id="selectOfTypeOfCar" value={this.state.IdOfCurrentSelectedType} onChange={this.handleSelectChange} variant="filled">
                            {menuItems}
                        </MySelect>
                    </FormGroup>
                </FormControl>
                <div className="button"><a className="buttonA" href="####" onClick={this.addCar}>Add</a></div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        address: state.AddCar.newCarAddress,
        city: state.AddCar.AddCarCity,
        zipCode: state.AddCar.AddCarZipCode,
        prize: state.AddCar.AddCarPrizePerDay,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        newData: (typeToRedux, data) => dispatch(newData(typeToRedux, data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCar)