import React, { Component } from 'react'
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextInput from "../logingPage/TextInput"
import "./rentACar.css"
import { connect } from "react-redux"
import { newData } from "../actions/addData"
import cookie from "react-cookies"

class RentACar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            carCategories: null,
            carFuel: null,
            carEquipment: null,
            n1: false,
            n2: false,
            n3: false,
            n4: false,
            n5: false,
            n6: false,
            n7: false,
            n8: false,
            tabOfEquipment: [],
            category: null,
            fuel: null,
            automaticTransmission: false,
            info: "",
            carsSearched: false,
            listOfCars: [],
            images: ["/cars/car1.jpg", "/cars/car2.jpg", "/cars/car3.jpg", "/cars/car4.jpg"],
            currentFrom: "",
            currentTo: ""
        }

        this.handleChangeEquipment = this.handleChangeEquipment.bind(this)
        this.handleChangeCategories = this.handleChangeCategories.bind(this)
        this.handleChangeFuel = this.handleChangeFuel.bind(this)
        this.handleChangeTransmission = this.handleChangeTransmission.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.returnToPreviousPage = this.returnToPreviousPage.bind(this)
        this.handleRent = this.handleRent.bind(this)
    }

    static propTypes = {
        back: PropTypes.func.isRequired,
    };

    handleRent(id) {
        var token = cookie.select(/^token$/)
        var from = this.state.currentFrom
        var to = this.state.currentTo
        var obj = {
            carRentalId: id,
            from: from,
            to: to
        }
        fetch("http://localhost:3001/reservation", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token.token
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    infoAboutAction: "Request sent, check 'Your reservations' for more info"
                })
                this.props.back() //przejscie na strone z rezerwacjami
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    returnToPreviousPage() {
        this.setState({
            carsSearched: false,
            infoAboutAction: "Request sent, check 'Your reservations' for more info"
        })
    }

    handleSearch() {
        var from = this.props.from
        var to = this.props.to
        var place = this.props.place
        var people = this.props.people
        var category = this.state.category
        var fuel = this.state.fuel
        var transmission = this.state.automaticTransmission
        var tabOfEquipment = [this.state.n1, this.state.n2, this.state.n3, this.state.n4, this.state.n5, this.state.n6, this.state.n7, this.state.n8]
        console.log(tabOfEquipment)
        var formedTab = []
        for (let i = 0; i < tabOfEquipment.length; i++) {
            if (tabOfEquipment[i] == true) {
                formedTab.push((i + 1))
            }
        }
        if (from != "" && to != "") {
            var obj = {
                rentFrom: new Date(from).toISOString(),
                rentTo: new Date(to).toISOString(),
                city: place,
                carCategoryId: category,
                fuelId: fuel,
                requiredEquipment: formedTab,
                hasAutomaticTransmission: transmission,
                minPersonsNumber: people
            }
            this.setState({
                currentFrom: new Date(from).toISOString(),
                currentTo: new Date(to).toISOString(),
                infoAboutAction: ""
            })
            console.log(obj)
            fetch("http://localhost:3001/car-rental/search", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', "");
                    this.props.newData("from", "")
                    this.props.newData("to", "")
                    this.props.newData("place", "")
                    this.props.newData("people", "")
                    this.setState({
                        n1: false,
                        n2: false,
                        n3: false,
                        n4: false,
                        n5: false,
                        n6: false,
                        n7: false,
                        n8: false,
                        tabOfEquipment: [],
                        category: null,
                        fuel: null,
                        automaticTransmission: false,
                        carsSearched: true,
                        listOfCars: data
                    })
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        else {
            this.setState({
                info: "Dates are required"
            })
        }
    }

    handleChangeTransmission() {
        this.setState({
            automaticTransmission: !this.state.automaticTransmission
        })
    }

    handleChangeFuel(event) {
        this.setState({ fuel: parseInt(event.target.getAttribute("value")) });
    }

    handleChangeCategories(event) {
        this.setState({ category: parseInt(event.target.getAttribute("value")) });
    }

    handleChangeEquipment = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    componentDidMount() {
        fetch('http://localhost:3001/car-category', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.setState({
                    carCategories: data
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        fetch('http://localhost:3001/fuel', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.setState({
                    carFuel: data
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        fetch('http://localhost:3001/equipment', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.setState({
                    carEquipment: data
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    static propTypes = {

    };

    static defaultProps = {

    };

    render() {
        if (this.state.carsSearched == false) {
            if (this.state.carEquipment != null && this.state.carCategories != null && this.state.carFuel != null) {
                var that = this
                var equipment = this.state.carEquipment.map(function (val) {
                    var nowVal = "n" + val.id
                    // console.log(nowVal, " ", that.state.nowVal, that.state)
                    return (
                        <FormControlLabel
                            control={<Checkbox checked={that.state[nowVal]} onChange={that.handleChangeEquipment} name={nowVal} color="primary" />}
                            label={val.name}
                        />
                    )
                })
                // console.log(equipment)
                var categories = this.state.carCategories.map((val) => {
                    return (
                        <FormControlLabel value={val.id} control={<Radio color="primary" />} label={val.name} />
                    )
                })
                var fuel = this.state.carFuel.map((val) => {
                    return (
                        <FormControlLabel value={val.id} control={<Radio color="primary" />} label={val.name} />
                    )
                })
                return (
                    <div id="search">
                        <p id="error_info">{this.state.info}</p>
                        <FormControl component="fieldset">
                            <div id="fControl">
                                <div className="onePart">
                                    <FormLabel component="legend">Select Car Quipment</FormLabel>
                                    <FormGroup>
                                        {equipment}
                                    </FormGroup>
                                </div>
                                <div className="onePart">
                                    <FormLabel component="legend">Automatic Transmission</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.automaticTransmission} onChange={this.handleChangeTransmission} color="primary" />}
                                            label="Yes/Now"
                                        />
                                    </FormGroup>
                                </div>
                                <div className="onePart">
                                    <FormLabel component="legend">Select Car Category</FormLabel>
                                    <RadioGroup aria-label="category" name="category" value={this.state.category} onChange={this.handleChangeCategories}>
                                        {categories}
                                    </RadioGroup>
                                </div>
                                <div className="onePart">
                                    <FormLabel component="legend">Select Fuel Type</FormLabel>
                                    <RadioGroup aria-label="fuel" name="fuel" value={this.state.fuel} onChange={this.handleChangeFuel}>
                                        {fuel}
                                    </RadioGroup>
                                </div>
                            </div>
                            <div id="dates">
                                <TextInput id="from" typeToRedux="from" label="From" key={1} type="date" />
                                <TextInput id="to" typeToRedux="to" label="To" key={2} type="date" />
                            </div>
                            <div id="place">
                                <TextInput id="place" typeToRedux="place" label="Place" key={3} />
                                <TextInput id="people" typeToRedux="people" label="How Many People" key={4} type="number" />
                            </div>
                        </FormControl>
                        <div className="button"><a className="buttonA" href="####" onClick={this.handleSearch} key="searching">Search</a></div>
                    </div>
                )
            }
            else {
                return (
                    <div></div>
                )
            }
        }
        else {
            console.log(this.state.listOfCars)
            var that = this
            var cars = ""
            if (this.state.listOfCars.errors == undefined) {
                cars = this.state.listOfCars.map(function (now, k) {
                    var currentEquipment = ""
                    for (let i = 0; i < now.car.equipment.length; i++) {
                        currentEquipment += (now.car.equipment[i].name + ", ")
                    }
                    currentEquipment = currentEquipment.slice(0, -2)
                    var randomNr = Math.floor(Math.random() * 4)
                    var strOfImg = that.state.images[randomNr]
                    if (now.car.automaticTransmition == true) {
                        return (
                            <div className="cars" key={k}>
                                <div className="oneInside">
                                    {<img src={process.env.PUBLIC_URL + strOfImg} className="carImg" />}
                                </div>
                                <div className="oneInside">
                                    <p>ID: {now.id}</p>
                                    <p>Prize per day: {now.prizePerDay}</p>
                                    <p>Address: {now.addrese.city}, {now.addrese.addressLine1} {now.addrese.addressLine2}, {now.addrese.zipCode}</p>
                                </div>
                                <div className="oneInside">
                                    <p>Car: {now.car.brand} {now.car.model}</p>
                                    <p>Equipment: {currentEquipment}</p>
                                    <p>Automatic Transmition: Yes</p>
                                    <p>Category: {now.car.car_category.name}</p>
                                </div>
                                <div className="oneInside">
                                    <p>Doors: {now.car.doorsNumber}</p>
                                    <p>Fuel: {now.car.fuel.name}</p>
                                    <p>Number Of People: {now.car.personsNumber}</p>
                                </div>
                                <div className="oneInside">
                                    <div className="button"><a className="buttonA" id="switch" href="####" onClick={() => {
                                        that.handleRent(now.id)
                                    }}>Rent It</a></div>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className="cars" key={k}>
                                <div className="oneInside">
                                    {<img src={process.env.PUBLIC_URL + strOfImg} className="carImg" />}
                                </div>
                                <div className="oneInside">
                                    <p>ID: {now.id}</p>
                                    <p>Prize per day: {now.prizePerDay}</p>
                                    <p>Address: {now.addrese.city}, {now.addrese.addressLine1} {now.addrese.addressLine2}, {now.addrese.zipCode}</p>
                                </div>
                                <div className="oneInside">
                                    <p>Car: {now.car.brand} {now.car.model}</p>
                                    <p>Equipment: {currentEquipment}</p>
                                    <p>Automatic Transmition: No</p>
                                    <p>Category: {now.car.car_category.name}</p>
                                </div>
                                <div className="oneInside">
                                    <p>Doors: {now.car.doorsNumber}</p>
                                    <p>Fuel: {now.car.fuel.name}</p>
                                    <p>Number Of People: {now.car.personsNumber}</p>
                                </div>
                                <div className="oneInside">
                                    <div className="button"><a className="buttonA" id="switch" href="####" key="renting" onClick={() => {
                                        that.handleRent(now.id)
                                    }} > Rent It</a></div>
                                </div>
                            </div>
                        )
                    }
                })
            }
            console.log(cars)
            return (
                <div id="divForCars">
                    <p id="error_info">{this.state.infoAboutAction}</p>
                    {cars}
                    <div className="button"><a className="buttonA" id="switch" href="####" onClick={that.returnToPreviousPage}>Return To Previous Page</a></div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        from: state.fromTo.from,
        to: state.fromTo.to,
        place: state.fromTo.place,
        people: state.fromTo.people,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newData: (typeToRedux, data) => dispatch(newData(typeToRedux, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentACar)
