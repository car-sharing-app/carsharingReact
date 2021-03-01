import React, { Component } from 'react'
import cookie from 'react-cookies'
import "./manageUsers.css"

export default class ManageUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 1,
            pages: undefined,
            currentUsers: []
        }

        this.removeUser = this.removeUser.bind(this)
        this.reRender = this.reRender.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
    }

    componentDidMount() {
        var token = cookie.select(/^token$/)
        fetch('http://localhost:3001/user/page/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.token
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    pages: data.allPages,
                    currentUsers: data.users
                })
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    prevPage() {
        let nextPage = this.state.currentPage - 1
        this.setState({
            currentPage: nextPage
        })
        var token = cookie.select(/^token$/)
        fetch('http://localhost:3001/user/page/' + nextPage, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.token
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    pages: data.allPages,
                    currentUsers: data.users
                })
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    nextPage() {
        let nextPage = this.state.currentPage + 1
        this.setState({
            currentPage: nextPage
        })
        var token = cookie.select(/^token$/)
        fetch('http://localhost:3001/user/page/' + nextPage, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.token
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    pages: data.allPages,
                    currentUsers: data.users
                })
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    removeUser(id) {
        var token = cookie.select(/^token$/)
        fetch('http://localhost:3001/user/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.token
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.reRender()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    reRender() {
        var token = cookie.select(/^token$/)
        fetch('http://localhost:3001/user/page/' + this.state.currentPage, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.token
            }
        })
            .then(response => response.json())
            .then(data => {
                let prev = this.state.currentPage
                // else {
                this.setState({
                    pages: data.allPages,
                    currentUsers: data.users,
                    currentPage: prev
                }, () => {
                    if (data.users.length == 0) {
                        this.setState({
                            currentPage: (prev - 1)
                        }, () => {
                            this.reRender()
                        })
                        // prev -= 1

                    }
                })

                // }
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        var that = this
        var users = this.state.currentUsers.map(function (elem, i) {
            var active = "No"
            if (elem.activeAccount == true) {
                active = "Yes"
            }
            return (
                <tr>
                    <td>{elem.id}</td>
                    <td>{elem.username}</td>
                    <td>{active}</td>
                    <td>{elem.email}</td>
                    <td>{elem.phoneNumber}</td>
                    <td>{elem.role}</td>
                    <td><img src={process.env.PUBLIC_URL + "/delete.png"} className="del2" onClick={that.removeUser.bind(this, elem.id)} /></td>
                </tr>)
        })
        let buttonToNextPage = null
        if (this.state.currentPage != this.state.pages) {
            buttonToNextPage = <a className="buttonA" id="switch" href="####" onClick={this.nextPage}>Next Page</a>
        }
        let buttonPreviousPage = null
        if (this.state.currentPage != 1) {
            buttonPreviousPage = <a className="buttonA" id="switch" href="####" onClick={this.prevPage}>Previous Page</a>
        }
        return (
            <div id="contentWithUsers">
                <table>
                    <tr>
                        <td>ID</td>
                        <td>Username</td>
                        <td>Active Account</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Role</td>
                        <td>Remove</td>
                    </tr>
                    {users}
                </table>
                <p>Strona {this.state.currentPage} z {this.state.pages}</p>
                {buttonToNextPage}
                {buttonPreviousPage}
            </div>
        )
    }
}
