import React, {Component} from 'react';
import './App.css';
import './templatemo-style.css';
import {Navbar} from "./components/Navbar";
import {SearchBar} from "./components/SearchBar";
import {Featured} from "./components/Featured";
import {Recipes} from "./components/Recipes";

class App extends Component {



    constructor(props) {
        super(props);
        let basurl = "https://api.edamam.com/search?q=chicken&app_id=5b5897f7&app_key=9ac6d44f07118d8a2bead5a790b270d5&from=0&to=10&calories=591-722&health=alcohol-free"

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            hits: [],
            isLoading: false,
            homeUrl: "http://192.168.160.73:8080/",
            searchUrl: "http://192.168.160.73:8080/search/q=",
            searchprase: ""
        };
    }


    componentDidMount() {
        this.setState({isLoading: true});

        //this.performSearch();

        fetch("http://192.168.160.73:8080/api")
            .then(response => response.json())
            .then(data => this.setState({hits: data, isLoading: false}));
    }

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

    /*handleSubmit() {
        let url = window.location.href;
        alert(url);
        return url.split("/")[3];
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
