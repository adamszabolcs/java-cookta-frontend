import Auth from './Auth.js';
import React, {Component} from 'react';
import './App.css';
import './templatemo-style.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import AddRecipe from "./pages/AddRecipe";

import { library } from '@fortawesome/fontawesome-svg-core'
import {faUndo} from '@fortawesome/free-solid-svg-icons'
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {Navbar} from "./components/Navbar";

library.add(faUndo);
library.add(faPlusSquare);

const HEALTH_FILTER = ["Gluten", "Soy", "Peanut", "Fish", "Dairy", "Shellfish", "Egg", "Tree-Nut", "Wheat"];
const DIET_FILTERS = ["Vegetarian", "Paleo", "Low-Fat", "Low-Carb", "Low-Sodium", "Balanced"];

const auth = new Auth();

class App extends Component {

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            health: HEALTH_FILTER.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            ),
            diet: DIET_FILTERS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            ),
            hits: [],
            isLoading: false,
            searchprase: "",
            isLoginVisible: false,
            username: "",
            userData: {},
            wrongCredentials: false,
            isLoggedIn: false
        };

    }

    componentDidMount() {

        this.checkIfRefered();

        if (localStorage.getItem("userData") !== null) {
            this.setState({userData: JSON.parse(localStorage.getItem("userData"))});
            this.setState({isLoggedIn: true});
            this.setState({username: localStorage.getItem("username")});
            this.setState({health: JSON.parse(localStorage.getItem("health"))});
            this.setState({diet: JSON.parse(localStorage.getItem("diet"))});
        }
    }

    setUserIntolerances(userData, stateData) {
        for (let userDiet in userData) {
            let machingKey = userDiet.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
            for (let dietKey in stateData) {
                if (machingKey === dietKey.toLowerCase()) {
                    if (dietKey in this.state.diet) {
                        this.setState({
                            diet: {
                                ...this.state.diet,
                                [dietKey]: this.state.userData.diet[userDiet]
                            }
                        });
                    } else {
                        this.setState({
                            health: {
                                ...this.state.health,
                                [dietKey]: this.state.userData.health[userDiet]
                            }
                        });
                    }
                }
            }
        }
    }

    handleCheckboxChange = name => {

        if (name in this.state.diet) {
            this.setState(prevState => ({
                diet: {
                    ...prevState.diet,
                    [name]: !prevState.diet[name]
                },
            }));
        }

        if (name in this.state.health) {
            this.setState(prevState => ({
                health: {
                    ...prevState.health,
                    [name]: !prevState.health[name]
                }
            }));
        }
    };

    handleChange(event) {
        this.setState({searchprase: event.target.value});
    }

    loginUser() {
        auth.login();
    }

    submitLogin(username) {
        let url = 'http://localhost:8080/cookta/authentication';
        let data = {username: username};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(responseData => {
                this.setState({
                    userData: responseData,
                    //wrongCredentials: false,
                    //password: "",
                    isLoggedIn: true
                });
                localStorage.setItem("userData", JSON.stringify(responseData))
            })
            .then(() => this.setUserIntolerances(this.state.userData.diet, this.state.diet))
            .then(() => this.setUserIntolerances(this.state.userData.health, this.state.health))
            //.then(() => this.setHealthCheckboxes())
            //.then(() => localStorage.setItem("username", JSON.stringify(this.state.username)))
            .then(() => localStorage.setItem("diet", JSON.stringify(this.state.diet)))
            .then(() => localStorage.setItem("health", JSON.stringify(this.state.health)))
            .then(() => console.log('Success:', JSON.stringify(this.state.userData)))
            .catch(error => {
                this.setState({wrongCredentials: true});
                console.log('Error fetching and parsing data: ', error);
            });
    }

    logout() {
        auth.logout();
        localStorage.removeItem("userData");
        localStorage.removeItem("diet");
        localStorage.removeItem("health");
        localStorage.removeItem("username");
        this.setState({isLoggedIn: false});
        this.resetCheckBoxes();
    }

    resetCheckBoxes(){
        this.setState({
            health: HEALTH_FILTER.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            ),
            diet: DIET_FILTERS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            )
        });
    }

    checkIfRefered() {
        let windowLocation = window.location.href;
        if (document.referrer === windowLocation.concat("registration")) {
            this.loginUser()
        }
    }


    render() {

        const {diet, health, isLoginVisible, username, isLoggedIn, userData, searchprase, wrongCredentials, hits} = this.state;

        return (
            <BrowserRouter>
                <div>
                    <Navbar
                        isLoginVisible={isLoginVisible}
                        loginUser={this.loginUser}
                        username={username}
                        isLoggedIn={isLoggedIn}
                        userData={userData}
                        logoutUser={this.logout}
                    />
                    <Route exact={true} path='/' render={() => {
                        auth.handleAuthentication(this.submitLogin);
                        return (
                        <div className="App">
                            <Home
                            searchprase={searchprase}
                            onSubmit={this.handleSubmit}
                            searchValueChange={this.handleChange}
                            dietCheckboxes={diet}
                            healthCheckboxes={health}
                            handleCheckBoxChange={this.handleCheckboxChange}
                            wrongCredentials={wrongCredentials}
                            recipes={hits}
                            isLoggedIn={isLoggedIn}
                            username={username}
                            />
                        </div> )}
                    }/>
                    <Route exact={true} path='/registration' render={() => (
                        <div className="App">
                            <Registration/>
                        </div>
                    )}/>
                    <Route exact={true} path='/profile' render={() => (
                        <div className="App">
                            <Profile
                                dietCheckboxes={this.state.diet}
                                healthCheckboxes={this.state.health}
                                handleCheckBoxChange={this.handleCheckboxChange}
                                isLoggedIn={this.state.isLoggedIn}
                                username={this.state.username}
                            />

                        </div>
                    )}/>
                    <Route exact={true} path='/addrecipe' render={() => (
                        <div className="AddRecipe">
                            <AddRecipe/>
                        </div>
                    )}/>

                </div>

            </BrowserRouter>

        );
    }
}

export default App;
