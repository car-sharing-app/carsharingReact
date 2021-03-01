import React, { Component } from 'react'
import PropTypes from "prop-types"
import TextInput from "../logingPage/TextInput"

export default class ChangeEmail extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        contentType: PropTypes.string
    };

    static defaultProps = {
        contentType: null
    };

    render() {
        return (
            <div>
                <React.Fragment>
                    <TextInput id="password" typeToRedux="passwordChangeEmail" label="Password" type="password" />
                    <TextInput id="email" typeToRedux="newEmailChangeEmail" label="New Email" />
                </React.Fragment>
            </div >
        )
    }
}
