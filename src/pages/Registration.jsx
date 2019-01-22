import React, {Component} from 'react';
import '../App.css';
import '../templatemo-style.css';
import '../registration.css';

const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const formValid = formErrors => {
    let valid = true;


    //if any of the formErrors values length is greater than zero, change valid to false.
    Object.values(formErrors).forEach( value => {
        value.length > 0 && (valid = false);
    });
};

export default class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            newUser: {
                userName: "",
                userPassword: "",
                userEmail: ""
            },
            formErrors: {
                userName: "",
                userPassword: "",
                userEmail: ""
            }
        };

    }

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.formErrors) {
            console.log(
                `
                SUBMITTING
                Username: ${this.state.newUser.userName}
                Email: ${this.state.newUser.userEmail}
                Password: ${this.state.newUser.userPassword}
                `);
        } else {
            console.error("FORM INVALID");
        }

    }

    handlChange = e => {
        const {name, value} = e.target;
        let newUser = this.state.newUser;


        switch (name) {
            case 'userName':
                newUser.userName = value.length
        }
    }

    render() {
        return (
            <div className="wrapper tm-container-outer tm-banner-bg">
                <div className="form-wrapper">
                    <h1>Create an account</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="userName">
                            <label htmlFor="userName" className="regLabel">Enter a username</label>
                            <input type="text"
                                   className="regInput"
                                   placeholder="Username"
                                   name="userName"
                                   onChange={this.handleChange}
                                   noValidate/>
                        </div>
                        <div className="email">
                            <label htmlFor="email" className="regLabel">Email</label>
                            <input type="email"
                                   className="regInput"
                                   placeholder="Email"
                                   name="email"
                                   onChange={this.handleChange}
                                   noValidate/>
                        </div>
                        <div className="password">
                            <label htmlFor="password" className="regLabel">Password</label>
                            <input type="password"
                                   className="regInput"
                                   placeholder="Password"
                                   name="password"
                                   onChange={this.handleChange}
                                   noValidate/>
                        </div>
                        <div className="createAccount">
                            <button type="submit">Create account</button>
                            <small>Already have an account?</small>
                        </div>
                    </form>

                </div>

            </div>
        );
    }
}