import React, {Component} from 'react';
import {UserInfoBox} from "../components/UserInfoBox";

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            userData: {},
            isLoggedIn: false
        };


    }

    componentDidMount() {
        this.setState({isLoading: true});


        if (localStorage.getItem("userData") !== null) {
            this.setState({userData: JSON.parse(localStorage.getItem("userData"))});
            this.setState({isLoggedIn: true});
            this.setState({username: JSON.parse(localStorage.getItem("username"))});
        }
    }


    render() {

        return (
            <div className="App">
                <UserInfoBox
                    dietCheckboxes={this.props.dietCheckboxes}
                    healthCheckboxes={this.props.healthCheckboxes}
                    handleCheckBoxChange={this.props.handleCheckBoxChange}
                    isLoggedIn={this.state.isLoggedIn}
                    username={this.state.username}
                />
            </div>

        );
    }
}