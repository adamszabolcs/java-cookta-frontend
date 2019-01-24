import React, {Component} from 'react';
import './App.css';
import './templatemo-style.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";

import { library } from '@fortawesome/fontawesome-svg-core'
import {faUndo} from '@fortawesome/free-solid-svg-icons'
import {Navbar} from "./components/Navbar";
import {FilterBar} from "./components/FilterBar";
library.add(faUndo);

const HEALTH_FILTER = ["Gluten", "Soy", "Peanut", "Fish", "Dairy", "Shellfish", "Egg", "Tree-Nut", "Wheat"];
const DIET_FILTERS = ["Vegetarian", "Paleo", "Low-Fat", "Low-Carb", "Low-Sodium", "Balanced"];


class App extends Component {

    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showLoginField = this.showLoginField.bind(this);
        this.hideLoginField = this.hideLoginField.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
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
            password: "",
            userData: {},
            wrongCredentials: false,
            isLoggedIn: false
        };

    }

    componentDidMount() {
        this.setState({isLoading: true});

        this.performSearch();

        this.checkIfRefered();

        if (localStorage.getItem("userData") !== null) {
            this.setState({userData: JSON.parse(localStorage.getItem("userData"))});
            this.setState({isLoggedIn: true});

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


    performSearch = (query = '') => {
        this.setState({isLoading: true});
        let passed = "";
        if (query !== '') {
            passed = "search/" + query;
        }
        console.log(passed);
        fetch("http://localhost:8080/api/" + passed)
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    hits: responseData, isLoading: false
                });
            })
            .catch(error => {
                // this.setState({hits: []});
                console.log('Error fetching and parsing data: ', error);
            });
    };


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

    handleSubmit(event) {
        event.preventDefault();
        let urlPart = "?q=" + this.state.searchprase + "&";
        let diet = this.state.diet;
        let health = this.state.health;

        for (let h in health) {
            if (health[h] && HEALTH_FILTER.indexOf(h) > -1) {
                urlPart += "health" + "=" + h.toLowerCase() + "-free" + "&"
            }
        }
        for (let d in diet) {
            if (diet[d] && DIET_FILTERS.indexOf(d) > -1) {
                urlPart += "diet" + "=" + d.toLowerCase() + "&"
            }

        }
        urlPart = urlPart.substring(0, urlPart.length - 1);
        console.log(urlPart);
        this.performSearch(urlPart)

    }

    handleChange(event) {
        this.setState({searchprase: event.target.value});
    }

    showLoginField() {
        this.setState({isLoginVisible: true})
    }

    hideLoginField() {
        this.setState({isLoginVisible: false})
    }

    handleUsernameInput(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordInput(event) {
        this.setState({password: event.target.value});
    }

    submitLogin(event) {
        event.preventDefault();
        let url = 'http://localhost:8080/cookta/login';
        let data = {username: this.state.username, password: this.state.password};

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
                    wrongCredentials: false,
                    password: "",
                    isLoggedIn: true
                });
                localStorage.setItem("userData", JSON.stringify(responseData))
            })
            .then(() => this.setUserIntolerances(this.state.userData.diet, this.state.diet))
            .then(() => this.setUserIntolerances(this.state.userData.health, this.state.health))
            //.then(() => this.setHealthCheckboxes())
            .then(() => localStorage.setItem("diet", JSON.stringify(this.state.diet)))
            .then(() => localStorage.setItem("health", JSON.stringify(this.state.health)))
            .then(() => console.log('Success:', JSON.stringify(this.state.userData)))
            .catch(error => {
                this.setState({wrongCredentials: true});
                console.log('Error fetching and parsing data: ', error);
            });
    }

    logout() {
        localStorage.removeItem("userData");
        localStorage.removeItem("diet");
        localStorage.removeItem("health");
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
            this.showLoginField()
        }
    }


    render() {

        const {hits, isLoading, diet, health, searchprase, isLoginVisible, username, password, isLoggedIn, userData} = this.state;

        return (
            <BrowserRouter>
                <div>
                    <Navbar
                        isLoginVisible={isLoginVisible}
                        showLoginField={this.showLoginField}
                        hideLoginField={this.hideLoginField}
                        username={username}
                        password={password}
                        handleUsernameInput={this.handleUsernameInput}
                        handlePasswordInput={this.handlePasswordInput}
                        submitLogin={this.submitLogin}
                        isLoggedIn={isLoggedIn}
                        userData={userData}
                        logoutUser={this.logout}
                    />
                    <Route exact={true} path='/' render={() =>
                        <div className="App">
                            <Home
                            searchprase={this.state.searchprase}
                            onSubmit={this.handleSubmit}
                            searchValueChange={this.handleChange}
                            dietCheckboxes={diet}
                            healthCheckboxes={health}
                            handleCheckBoxChange={this.handleCheckboxChange}
                            wrongCredentials={this.state.wrongCredentials}
                            recipes={this.state.hits}
                            isLoading={this.state.isLoading}
                            />
                        </div>
                    }/>
                    <Route exact={true} path='/registration' render={() => (
                        <div className="App">
                            <Registration/>
                        </div>
                    )}/>
                    <Route exact={true} path='/profile' render={() => (
                        <div className="Profile">
                            <Profile
                                dietCheckboxes={this.state.diet}
                                healthCheckboxes={this.state.health}
                                handleCheckBoxChange={this.handleCheckboxChange}/>

                        </div>
                    )}/>

                </div>

            </BrowserRouter>

        );
    }
}

export default App;
