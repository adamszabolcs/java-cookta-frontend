import React, {Component} from 'react';
import '../App.css';
import '../templatemo-style.css';
import {SearchBar} from "../components/SearchBar";
import {Recipes} from "../components/Recipes";
import {Featured} from "../components/Featured";
import {Navbar} from "../components/Navbar";


const HEALTH_FILTER = ["Gluten", "Soy", "Peanut", "Fish", "Dairy", "Shellfish", "Egg", "Tree-Nut", "Wheat"];
const DIET_FILTERS = ["Vegetarian", "Paleo", "Low-Fat", "Low-Carb", "Low-Sodium", "Balanced"];

class Home extends Component {

    constructor(props) {
        super(props);
        let basurl = "https://api.edamam.com/search?q=chicken&app_id=5b5897f7&app_key=9ac6d44f07118d8a2bead5a790b270d5&from=0&to=10&calories=591-722&health=alcohol-free"

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showLoginField = this.showLoginField.bind(this);
        this.hideLoginField = this.hideLoginField.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.submitLogin = this.submitLogin.bind(this);


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
            isLogin: false,
            username: "",
            password: ""
        };
    }


    componentDidMount() {
        this.setState({isLoading: true});

        this.performSearch();

        this.checkIfRefered();
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

        this.setState(prevState => ({
            diet: {
                ...prevState.diet,
                [name]: !prevState.diet[name]
            },
            health: {
                ...prevState.health,
                [name]: !prevState.health[name]
            }
        }));

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

        /*fetch("http://localhost:8080/api/search/" + urlPart)
            .then(response => response.json())
            .then(data => this.setState({hits: data, isLoading: false}));*/
    }

    handleChange(event) {
        this.setState({searchprase: event.target.value});
    }

    showLoginField() {
        this.setState({isLogin:true})
    }

    hideLoginField() {
        this.setState({isLogin:false})
    }

    handleUsernameInput(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordInput(event) {
        this.setState({password: event.target.value});
    }

    submitLogin(event) {
        console.log("he");
        event.preventDefault();
        let url = 'http://10.0.2.15:8080/cookta/login';
        let data = {username: this.state.username, password: this.state.password};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));

    }

    checkIfRefered() {
        let windowLocation = window.location.href;
        if (document.referrer === windowLocation.concat("registration")) {
            this.showLoginField()
        }
    }


    render() {
        const {hits, isLoading, diet, health, searchprase, isLogin, username, password} = this.state;

        return (
            <div className="App">
                <Navbar
                    isLogin={isLogin}
                    showLoginField={this.showLoginField}
                    hideLoginField={this.hideLoginField}
                    username={username}
                    password={password}
                    handleUsernameInput={this.handleUsernameInput}
                    handlePasswordInput={this.handlePasswordInput}
                    submitLogin={this.submitLogin}
                />

                <SearchBar
                    searchprase={searchprase}
                    onSubmit={this.handleSubmit}
                    searchValueChange={this.handleChange}
                    checkboxes={diet}
                    checkboxes2={health}
                    handleCheckBoxChange={this.handleCheckboxChange}
                />
                <Featured/>
                <Recipes
                    recipes={hits}
                    isLoading={isLoading}
                />
            </div>
        );
    }
}

export default Home;
