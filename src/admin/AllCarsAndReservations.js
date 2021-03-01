import React, { Component } from 'react'
import cookie from "react-cookies"
import { lime } from '@material-ui/core/colors'
import "./allCarsAndReservations.css"
import PropTypes from "prop-types"


export default class AllCarsAndReservations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allCars: []
        }

        this.removeCar = this.removeCar.bind(this)
        this.reRender = this.reRender.bind(this)
        this.carTypeDetails = this.carTypeDetails.bind(this)
    }

    static propTypes = {
        back: PropTypes.func.isRequired,
    };

    componentDidMount() {
        let token = cookie.select(/^token$/)
        fetch("http://localhost:3001/car-rental", {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer " + token.token
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data)
                this.setState({
                    allCars: data
                })
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }

    removeCar(id) {
        console.log(id)
        var token = cookie.select(/^token$/)
        fetch('http://localhost:3001/car-rental/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.reRender()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    reRender() {
        let token = cookie.select(/^token$/)
        fetch("http://localhost:3001/car-rental", {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer " + token.token
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data)
                this.setState({
                    allCars: data
                })
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }

    carTypeDetails() {
        this.props.back()
    }

    render() {
        let that = this
        console.log(this.state.allCars)
        let rows = this.state.allCars.map(function (elem, i) {
            let reservations = elem.reservations.map(function (elem2, j) {
                let from = new Date(elem2.from)
                from = from.toDateString()
                let to = new Date(elem2.to)
                to = to.toDateString()
                return (
                    <p class="smallP">
                        {from} - {to}
                    </p>
                )
            })
            return (
                <tr>
                    <td>
                        {elem.id}
                    </td>
                    <td>
                        {elem.prizePerDay}
                    </td>
                    <td>
                        {elem.addrese.city}
                    </td>
                    <td>
                        {elem.addrese.addressLine1}
                    </td>
                    <td>
                        {elem.addrese.zipCode}
                    </td>
                    <td onClick={that.carTypeDetails} className="active">
                        {elem.car.id}
                    </td>
                    <td>
                        {elem.car.brand}
                    </td>
                    <td>
                        {elem.car.model}
                    </td>
                    <td>
                        {reservations}
                    </td>
                    <td>
                        <img src={process.env.PUBLIC_URL + "/delete.png"} className="del2" onClick={that.removeCar.bind(this, elem.id)} />
                    </td>
                </tr>
            )
        })
        return (
            <div>
                <table>
                    <tr>
                        <td>
                            ID
                        </td>
                        <td>
                            Prize Per Day
                        </td>
                        <td>
                            City
                        </td>
                        <td>
                            Street
                        </td>
                        <td>
                            ZipCode
                        </td>
                        <td>
                            Car Type Id
                        </td>
                        <td>
                            Car Brand
                        </td>
                        <td>
                            Car Model
                        </td>
                        <td>
                            Reservations
                        </td>
                        <td>
                            Remove
                        </td>
                    </tr>
                    {rows}
                </table>
            </div>
        )
    }
}
