import React, { Component } from 'react'
import PropTypes from "prop-types"
import TextInput from "../logingPage/TextInput"
import { connect } from "react-redux"
import "./change.css"

export default class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static propTypes = {
        contentType: PropTypes.string
    };

    static defaultProps = {
        contentType: null
    };


    render() {
        return (
            <React.Fragment>
                <TextInput id="oldPassword" typeToRedux="oldPasswordChange" label="Old password" type="password" />
                <TextInput id="newPassword" typeToRedux="newPasswordChange" label="New password" type="password" />
            </React.Fragment>
        )
    }
}

