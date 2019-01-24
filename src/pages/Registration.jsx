import React, {Component} from 'react';
import '../App.css';
import '../templatemo-style.css';
import '../registration.css';

const apiRegUrl = "http://localhost:8080/api/register";
const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const formValid = ({formErrors, ...rest}) => {
    let valid = true;

    //if any of the formErrors values length is greater than zero, change valid to false.
    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false);
    });

    //checks every value of the rest of the object
    Object.values(rest).forEach(value => {
        value === null && (valid = false);
    });

    return valid;
};

export default class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: null,
            userEmail: null,
            userPassword: null,
            userPassword2: null,
            formErrors: {
                userName: "",
                userEmail: "",
                userPassword: "",
                userPassword2: ""
            }
        };

    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            // console.log(
            //     `
            //     SUBMITTING
            //     Username: ${this.state.userName}
            //     Email: ${this.state.userEmail}
            //     Password: ${this.state.userPassword}
            //     Password2: ${this.state.userPassword}
            //     `);
            fetch(apiRegUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.userName,
                    email: this.state.userEmail,
                    password: this.state.userPassword
                })
            }).then(this.handleRedirect);
        } else {
            console.error("FORM INVALID");
            alert("Please fill out the form");
        }

    };

    handleRedirect = resp => {
        console.log(resp);
        if (resp.status === 200) {
            console.log("form submit was successful");
            window.location.pathname = "/";
        } else {
            alert("Username or email is already taken, full in the form again");
        }
    };


    handleChange = e => {
        e.preventDefault();

        const {name, value} = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'userName':
                formErrors.userName = value.length < 4 ? 'minimum 4 characters required' : "";
                break;
            case 'userEmail':
                formErrors.userEmail =
                    emailRegex.test(value) ? '' : 'invalid email address';
                break;

            case 'userPassword':
                formErrors.userPassword = value.length < 6 ? 'minimum 6 characters required' : "";
                break;

            case 'userPassword2':
                formErrors.userPassword2 = value !== this.state.userPassword ? "password doesn't match" : "";
                break;
            default:
                break;
        }

        this.setState({formErrors, [name]: value}, () => console.log(this.state));
    };

    render() {
        const {formErrors} = this.state;

        return (
            <div className="wrapper tm-container-outer tm-banner-bg">
                <div className="form-wrapper">
                    <h1>Create an account</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="userName">
                            <label htmlFor="userName" className="regLabel">Enter a username</label>
                            <input type="text"
                                   className={formErrors.userName.length > 0 ? "error" : null}
                                   placeholder="Username"
                                   name="userName"
                                   onChange={this.handleChange}
                                   noValidate/>
                        </div>
                        {formErrors.userName.length > 0 && (
                            <span className='errorMessage'>{formErrors.userName}</span>
                        )
                        }
                        <div className="email">
                            <label htmlFor="email" className="regLabel">Email</label>
                            <input type="email"
                                   className={formErrors.userEmail.length > 0 ? "error" : null}
                                   placeholder="Email"
                                   name="userEmail"
                                   onChange={this.handleChange}
                                   noValidate/>
                        </div>
                        {formErrors.userEmail.length > 0 && (
                            <span className="errorMessage">{formErrors.userEmail}</span>
                        )}
                        <div className="password">
                            <label htmlFor="password" className="regLabel">Password</label>
                            <input type="password"
                                   className={formErrors.userPassword.length > 0 ? "error" : null}
                                   placeholder="Password"
                                   name="userPassword"
                                   onChange={this.handleChange}
                                   noValidate/>
                        </div>
                        {formErrors.userPassword.length > 0 && (
                            <span className="errorMessage">{formErrors.userPassword}</span>
                        )}
                        <div className="password">
                            <label htmlFor="password" className="regLabel">Password</label>
                            <input type="password"
                                   className={formErrors.userPassword2.length > 0 ? "error" : null}
                                   placeholder="Password again"
                                   name="userPassword2"
                                   onChange={this.handleChange}
                                   noValidate/>
                        </div>
                        {formErrors.userPassword2.length > 0 && (
                            <span className="errorMessage">{formErrors.userPassword2}</span>
                        )}
                        <div className="createAccount">
                            <button type="submit">Create account</button>
                            <a href="/"><small>Already have an account? Login!</small></a>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}