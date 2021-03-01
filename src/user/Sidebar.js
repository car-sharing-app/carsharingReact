import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import "./sidebar.css"
import PropTypes from "prop-types"
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
export default class Sidebar extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired
    };
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            currentOpen: null
        }
        this.changeOpen = this.changeOpen.bind(this)
    }

    changeOpen(e) {
        if (e.target.children[0] != undefined) {
            var interestingTarget = e.target.children[0].innerText
        }
        else if (e.target.innerText != undefined) {
            var interestingTarget = e.target.innerText
        }
        if (this.state.open == false) {
            this.setState({
                open: !this.state.open,
                currentOpen: interestingTarget
            })
        }
        else {
            if (interestingTarget == this.state.currentOpen) {
                this.setState({
                    open: !this.state.open,
                    currentOpen: null
                })
            }
            else {
                this.setState({
                    currentOpen: interestingTarget
                })
            }
        }
    }

    render() {

        return (
            <List disablePadding dense>
                {this.props.items.map(({ label, name, items: subItems }) => {
                    return (
                        <React.Fragment key={name}>
                            <TransitionGroup>
                                <ListItem key={name} button onClick={this.changeOpen}>
                                    <ListItemText ><span className="top">{label}</span></ListItemText>
                                </ListItem>

                                {this.state.open && this.state.currentOpen == label ? Array.isArray(subItems) ? (
                                    <CSSTransition timeout={1500} classNames="step">
                                        <List disablePadding >
                                            {subItems.map((subItem) => (
                                                <ListItem key={subItem.name} button onClick={subItem.onC} id={subItem.id}>
                                                    <ListItemText className="sub">
                                                        <span className="sub" >{subItem.label}</span>
                                                    </ListItemText>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CSSTransition>
                                ) : null : null}
                            </TransitionGroup>
                        </React.Fragment>
                    )
                })}
            </List>
        )
    }
}
