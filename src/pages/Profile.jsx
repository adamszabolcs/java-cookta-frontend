import React, {Component} from 'react';
import {UserInfoBox} from "../components/UserInfoBox";
import {Navbar} from "../components/Navbar";


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
                <Navbar/>
                <UserInfoBox/>
            </div>

        );
    }
}