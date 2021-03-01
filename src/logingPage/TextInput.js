import React, { Component } from 'react'
import "./TextInput.css"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { newData } from "../actions/addData"

class TextInput extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        typeToRedux: PropTypes.string.isRequired,
        type: PropTypes.string,
        focussed: PropTypes.bool,
        value: PropTypes.string,
        error: PropTypes.string,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        functionToChangeType: PropTypes.bool
    };

    static defaultProps = {
        type: "text",
        focussed: false,
        value: '',
        error: '',
        functionToChangeType: false,
        // label: '',
        onChange: () => '',
    };
    constructor(props) {
        super(props)

        this.state = {
            focussed: this.props.focussed,
            value: this.props.value,
            error: this.props.error,
            label: this.props.label
        }
        this.changingValue = this.changingValue.bind(this)
        this.reset = this.reset.bind(this)
    }

    reset() {
        console.log("secondReset")
        this.state({})
    }

    changingValue(event) {
        const { id } = this.props;
        const value = event.target.value;
        if (this.props.typeToRedux == "BirthDate" || this.props.typeToRedux == "ValidFrom" || this.props.typeToRedux == "ValidTo") {
            var date = new Date(value);
            this.props.newData(this.props.typeToRedux, date)
            this.setState({ value, error: '' });
        }
        else {
            this.props.newData(this.props.typeToRedux, value)
            this.setState({ value, error: '' });
        }
    }

    render() {
        const { focussed, value, error, label } = this.state;
        const { id, type } = this.props;
        if (focussed == true) {
            var ExtraClass = "field focussed"
        }
        else {
            var ExtraClass = "field"
        }
        // console.log(label)
        return (
            <div className={ExtraClass}>
                <input required type={type} value={value} placeholder={label} onChange={this.changingValue} onFocus={() => { this.setState({ focussed: true }) }} onBlur={() => { this.setState({ focussed: false }) }} />
                <label htmlFor={id} className={error && 'error'}>
                    {error || label}
                </label>
            </div>
        )
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        newData: (typeToRedux, data) => dispatch(newData(typeToRedux, data))
    }
}

export default connect(null, mapDispatchToProps)(TextInput)
