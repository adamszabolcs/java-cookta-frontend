import React, {Component} from 'react';
import '../App.css';
import '../templatemo-style.css';
import {SearchBar} from "../components/SearchBar";
import {Recipes} from "../components/Recipes";
import {Featured} from "../components/Featured";


const HEALTH_FILTER = ["Gluten", "Soy", "Peanut", "Fish", "Dairy", "Shellfish", "Egg", "Tree-Nut", "Wheat"];
const DIET_FILTERS = ["Vegetarian", "Paleo", "Low-Fat", "Low-Carb", "Low-Sodium", "Balanced"];

class Home extends Component {

    constructor(props) {
        super(props);
        let basurl = "https://api.edamam.com/search?q=chicken&app_id=5b5897f7&app_key=9ac6d44f07118d8a2bead5a790b270d5&from=0&to=10&calories=591-722&health=alcohol-free"

        this.handleSubmit = this.handleSubmit.bind(this);


        this.state = {

            hits: [],
            isLoading: false
        };
    }


    componentDidMount() {
        this.setState({isLoading: true});

        this.performSearch();
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



    handleSubmit(event) {
        event.preventDefault();
        let urlPart = "?q=" + this.props.searchprase + "&";
        let diet = this.props.dietCheckboxes;
        let health = this.props.healthCheckboxes;

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


    render(){
       /* const {hits, isLoading, diet, health, searchprase, isLoginVisible, username, password, isLoggedIn, userData} = this.state;*/

        return (
            <div className="App">

                {(this.props.wrongCredentials) ?
                    <p>Wrong Credentials</p> :
                    <span></span>
                }

                <SearchBar
                    searchprase={this.props.searchprase}
                    onSubmit={this.handleSubmit}
                    searchValueChange={this.props.searchValueChange}
                    dietCheckboxes={this.props.dietCheckboxes}
                    healthCheckboxes={this.props.healthCheckboxes}
                    handleCheckBoxChange={this.props.handleCheckBoxChange}
                />
                <Recipes
                    recipes={this.state.hits}
                    isLoading={this.state.isLoading}
                    isLoggedIn={this.props.isLoggedIn}
                    username={this.props.username}
                />
            </div>
        );
    }
}

export default Home;
