import React, { Component } from 'react'
import cookie from "react-cookies"
import "./allCarTypes.css"

export default class AllCarTypes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabOfAll: []
        }

        this.removeCar = this.removeCar.bind(this)
        this.reRender = this.reRender.bind(this)
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
                    tabOfAll: data
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    removeCar(id) {
        console.log(id)
        var token = cookie.select(/^token$/)
        fetch('http://localhost:3001/car/' + id, {
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
        fetch('http://localhost:3001/car', {
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
                    tabOfAll: data
                })
                console.log(this.state)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        let that = this
        let rows = this.state.tabOfAll.map(function (elem, i) {
            let automatic = "No"
            if (elem.automaticTransmition == true) {
                automatic = "Yes"
            }
            let equipment = elem.equipment.map(function (elem2, j) {
                return (
                    <p class="smallP">
                        {elem2.name}
                    </p>
                )
            })
            return (
                <tr>
                    <td>
                        {elem.id}
                    </td>
                    <td>
                        {elem.brand}
                    </td>
                    <td>
                        {elem.model}
                    </td>
                    <td>
                        {elem.car_category.name}
                    </td>
                    <td>
                        {elem.fuel.name}
                    </td>
                    <td>
                        {elem.doorsNumber}
                    </td>
                    <td>
                        {automatic}
                    </td>
                    <td>
                        {equipment}
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
                        <td>ID</td>
                        <td>Brand</td>
                        <td>Model</td>
                        <td>Category</td>
                        <td>Fuel</td>
                        <td>Door number</td>
                        <td>Automatic Transmission</td>
                        <td>Equipment</td>
                        <td>Remove</td>
                    </tr>
                    {rows}
                </table>
            </div>
        )
    }
}
