import React, {Component} from 'react';
import {UserInfoBox} from "../components/UserInfoBox";
import {Navbar} from "../components/Navbar";
import {FilterBar} from "../components/FilterBar";


export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: null,
            userEmail: null,
        };
    }

    render() {

        return (
            <div className="Profile">
                <UserInfoBox
                    dietCheckboxes={this.props.dietCheckboxes}
                    healthCheckboxes={this.props.healthCheckboxes}
                    handleCheckBoxChange={this.props.handleCheckBoxChange}
                />
            </div>

        );
    }
}