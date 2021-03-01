import React, { Component } from 'react'
import cookie from "react-cookies"
import TextInput from "../logingPage/TextInput.js"
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { newData } from "../actions/addData"
import { connect } from "react-redux"
import PropTypes from "prop-types"

class AddCarType extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            fuel: [],
            equipment: [],
            automaticTransmission: false,
            currentChoosenCatogory: 1,
            currentChooseFuel: 1,
            currentEquipment: []
        }

        this.changeTransmission = this.changeTransmission.bind(this)
        this.changeCategory = this.changeCategory.bind(this)
        this.selectFuel = this.selectFuel.bind(this)
        this.handleChangeInEquipment = this.handleChangeInEquipment.bind(this)
        this.addCar = this.addCar.bind(this)
    }

    static propTypes = {
        back: PropTypes.func.isRequired,
    };

    componentDidMount() {
        let token = cookie.select((/^token$/))
        fetch('http://localhost:3001/car-category', {
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
                    categories: data
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        fetch('http://localhost:3001/fuel', {
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
                    fuel: data
                })

            })
            .catch((error) => {
                console.error('Error:', error);
            });
        fetch('http://localhost:3001/equipment', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token.token
            },
        })
            .then(response => response.json())
            .then(data => {
                let tab = []
                for (let i = 0; i < data.length; i++) {
                    tab.push(false)
                }
                console.log('Success:', data);
                this.setState({
                    equipment: data,
                    currentEquipment: tab
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setTimeout(() => {
            console.log(this.state)
        }, 5000);
    }

    handleChangeInEquipment(id) {
        id = id - 1
        let previous = this.state.currentEquipment
        let prevVal = previous[id]
        previous[id] = !prevVal
        this.setState({
            currentEquipment: previous
        })
    }

    changeTransmission() {
        let previous = this.state.automaticTransmission
        this.setState({
            automaticTransmission: !previous
        })
    }

    changeCategory(event) {
        this.setState({ currentChoosenCatogory: parseInt(event.target.getAttribute("value")) });
    }

    selectFuel(event) {
        this.setState({ currentChooseFuel: parseInt(event.target.getAttribute("value")) });
    }

    addCar() {
        let objToSend = {
            brand: this.props.brand,
            model: this.props.model,
            doorsNumber: this.props.doors,
            personsNumber: this.props.persons,
            automaticTransmition: this.state.automaticTransmission,
            carCategoryId: this.state.currentChoosenCatogory,
            fuelId: this.state.currentChooseFuel,
            equipment: []
        }

        console.log(objToSend)

        for (let i = 0; i < this.state.currentEquipment.length; i++) {
            if (this.state.currentEquipment[i] == true) {
                let res = i + 1
                objToSend.equipment.push(res)
            }
        }

        let token = cookie.select(/^token$/)
        console.log(this.props)
        if (objToSend.brand != "" && objToSend.model != "" && objToSend.doorsNumber != "" && objToSend.personsNumber != "") {
            this.props.newData("newCarBrand", "")
            this.props.newData("newCarModel", "")
            this.props.newData("newCarDoors", "")
            this.props.newData("newCarPersons", "")
            this.setState({
                categories: [],
                fuel: [],
                equipment: [],
                automaticTransmission: false,
                currentChoosenCatogory: 1,
                currentChooseFuel: 1,
                currentEquipment: []
            })
            fetch('http://localhost:3001/car', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token.token
                },
                body: JSON.stringify(objToSend),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    this.props.back()
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    render() {
        let that = this
        let categories = this.state.categories
        let RadioCategories = categories.map(function (elem, i) {
            return (
                <FormControlLabel value={elem.id} control={<Radio color="primary" />} label={elem.name} />
            )
        })
        let fuels = this.state.fuel
        let CheckboxesFuel = fuels.map(function (elem, i) {
            return (
                <FormControlLabel value={elem.id} control={<Radio color="primary" />} label={elem.name} />
            )
        })
        let equipment = this.state.equipment
        let CheckboxesEquipment = equipment.map(function (elem, i) {
            return (
                <FormControlLabel
                    control={<Checkbox checked={that.state.currentEquipment[i]} onChange={that.handleChangeInEquipment.bind(this, elem.id)} name={elem.name} color="primary" />}
                    label={elem.name}
                />
            )
        })
        return (
            <div id="divForAddingCar">
                <FormControl id="newCarForm">
                    <FormGroup>
                        <FormLabel component="legend">Add Basic Information</FormLabel>
                        <TextInput id="Brand" typeToRedux="newCarBrand" label="Brand" value={this.props.brand} />
                        <TextInput id="Model" typeToRedux="newCarModel" label="Model" value={this.props.model} />
                        <TextInput id="Doors" typeToRedux="newCarDoors" label="Doors Number" value={this.props.doors} type="number" />
                        <TextInput id="Persons" typeToRedux="newCarPersons" label="Persons Number" value={this.props.persons} type="number" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel component="legend">Select Car Transmission</FormLabel>
                        <FormControlLabel
                            control={<Checkbox checked={this.state.automaticTransmission} onChange={this.changeTransmission} name color="primary" />}
                            label="Automatic Transmission"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel component="legend">Select Car Category</FormLabel>
                        <RadioGroup name="cateogry" value={this.state.currentChoosenCatogory} onChange={this.changeCategory}>
                            {RadioCategories}
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel component="legend">Select Fuel</FormLabel>
                        <RadioGroup name="fuel" value={this.state.currentChooseFuel} onChange={this.selectFuel}>
                            {CheckboxesFuel}
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel component="legend">Select Car Quipment</FormLabel>
                        {CheckboxesEquipment}
                    </FormGroup>
                </FormControl>
                <div className="button"><a className="buttonA" href="####" onClick={this.addCar}>Add</a></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        brand: state.NewCar.newCarBrand,
        model: state.NewCar.newCarModel,
        doors: state.NewCar.newCarDoors,
        persons: state.NewCar.newCarPersons,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newData: (typeToRedux, data) => dispatch(newData(typeToRedux, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCarType)
