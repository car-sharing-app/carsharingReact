import React, { Component } from 'react'
import cookie from "react-cookies"
import "./myreservations.css"
export default class MyReservations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reservations: []
        }


        this.deleteReservation = this.deleteReservation.bind(this)
        this.reRender = this.reRender.bind(this)
    }

    componentDidMount() {
        var token = cookie.select(/^token$/)
        fetch('http://localhost:3001/reservation/me', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.setState({
                    reservations: data
                })
                console.log(this.state)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    deleteReservation(id) {
        var token = cookie.select(/^token$/)
        fetch('http://localhost:3001/reservation/' + id, {
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
        var token = cookie.select(/^token$/)
        fetch('http://localhost:3001/reservation/me', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.token
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.setState({
                    reservations: data
                })
                console.log(this.state)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        var that = this
        var reservations = this.state.reservations.map(function (elem, i) {
            var date = new Date(elem.from)
            var date2 = new Date(elem.to)
            const diffTime = Math.abs(date2 - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            let valueToPay = diffDays * elem.car_rental.prizePerDay
            if (valueToPay == 0) {
                valueToPay = 1 * elem.car_rental.prizePerDay
            }
            return (
                <tr>
                    <td id="f">{elem.car_rental.address.city}, {elem.car_rental.address.addressLine1} {elem.car_rental.address.addressLine2}, {elem.car_rental.address.zipCode}</td>
                    <td>{elem.car_rental.car.brand} {elem.car_rental.car.model}</td>
                    <td>{elem.car_rental.prizePerDay}</td>
                    <td> {date.toDateString()} </td>
                    <td> {date2.toDateString()} </td>
                    <td> {valueToPay} </td>
                    <td > <img src={process.env.PUBLIC_URL + "/delete.png"} className="del2" onClick={that.deleteReservation.bind(this, elem.id)} /></td>
                </tr>
            )
        })
        return (
            <div>
                <table>
                    <td id="f">Location</td>
                    <td>Car details</td>
                    <td>Prize per day</td>
                    <td>From</td>
                    <td>To</td>
                    <td>Total Price</td>
                    <td>Delete</td>
                    {reservations}
                </table>
            </div>
        )
    }
}
