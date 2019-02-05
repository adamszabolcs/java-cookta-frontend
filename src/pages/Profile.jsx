import React, {Component} from 'react';
import {UserInfoBox} from "../components/UserInfoBox";

export default class Profile extends Component {


    render() {

        return (
            <div className="App">
                <UserInfoBox
                    dietCheckboxes={this.props.dietCheckboxes}
                    healthCheckboxes={this.props.healthCheckboxes}
                    handleCheckBoxChange={this.props.handleCheckBoxChange}
                    isLoggedIn={false}
                    username={this.props.username}
                />
            </div>
        );
    }
}