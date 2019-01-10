import React, {Component} from 'react';
import './App.css';
import './templatemo-style.css';
import {Navbar} from "./components/Navbar";
import {SearchBar} from "./components/SearchBar";
import {Featured} from "./components/Featured";
import {Recipes} from "./components/Recipes";


const HEALTH_FILTER = ["Gluten", "Soy", "Peanuts", "Fish", "Dairy", "Shellfish", "Eggs", "Tree Nuts", "Wheat"];
const DIET_FILTERS = ["Vegetarian", "Paleo", "Low-Fat", "Low-Carb", "Low-Sodium", "Balanced"];

class App extends Component {

    constructor(props) {
        super(props);
        let basurl = "https://api.edamam.com/search?q=chicken&app_id=5b5897f7&app_key=9ac6d44f07118d8a2bead5a790b270d5&from=0&to=10&calories=591-722&health=alcohol-free"

        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

        this.state = {
            /*checkboxes: HEALTH_FILTER.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
            ),
            checkboxes2: DIET_FILTERS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
            ),*/
            hits: [],
            isLoading: false,
            searchprase: ""
        };
    }


    componentDidMount() {
        this.setState({isLoading: true});

        //this.performSearch();

        fetch("https://api.edamam.com/search?q=chicken&app_id=5b5897f7&app_key=9ac6d44f07118d8a2bead5a790b270d5&from=0&to=10&calories=591-722&health=alcohol-free")
            .then(response => response.json())
            .then(data => this.setState({hits: data.hits, isLoading: false}));
    }


    /*handleCheckboxChange = name => {
        /!*const {name} = changeEvent.target;*!/

        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }));

        this.setState(prevState => ({
            checkboxes2: {
                ...prevState.checkboxes2,
                [name]: !prevState.checkboxes2[name]
            }
        }));
    };*/


    /*handleCheckboxChange = name =>{
        console.log(name);
        console.log("lol");
    }


    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        Object.keys(this.state.checkboxes)
            .filter(checkbox => this.state.checkboxes[checkbox])
            .forEach(checkbox => {
                console.log(checkbox, "is selected.");
            });

        Object.keys(this.state.checkboxes2)
            .filter(checkbox => this.state.checkboxes2[checkbox])
            .forEach(checkbox => {
                console.log(checkbox, "is selected.");
            });
    };*/


    handleSubmit(event) {
        event.preventDefault();

        console.log(event.target);
        const data = new FormData(event.target);
        console.log(data);
        fetch("http://192.168.160.73:8080/api/search", {
            method: 'POST',
            body: data,
        });
    }

    handleChange(event) {
        this.setState({searchprase: event.target.value});
    }


   /* performSearch = (query = false) => {
        let passed = "";
        if(query){
            let searchy = this.handleSubmit();
            passed = "search/" + searchy;
        }
        fetch("http://192.168.160.73:8080/api/"+passed)
            .then(response => response.json())
            .then(responseData => {this.setState({hits: responseData, isLoading: false
            });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }*/


    render() {
        const { hits, isLoading } = this.state;
        //{console.log(hits)}
        return (
            <div className="App">
                <Navbar/>
                <SearchBar
                    searchprase={this.state.searchprase}
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                    checkboxes={this.state.checkboxes}
                    checkboxes2={this.state.checkboxes2}
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

export default App;
