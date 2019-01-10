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

        this.state = {
            hits: [],
            isLoading: false,
            homeUrl: "http://192.168.160.73:8080/",
            searchUrl: "http://192.168.160.73:8080/search/q="
        };
    }


    componentDidMount() {
        this.setState({isLoading: true});

        fetch(this.state.homeUrl)
            .then(response => response.json())
            .then(data => this.setState({hits: data, isLoading: false}));
    }


    handleSubmit = () => {
        let url = window.location.href;
        //url = url.split("/")[3];
        alert(url);

        /*this.setState({homeUrl: "http://192.168.160.73:8080/search/q=" + url.split("/")[2]})
        console.log(this.state.homeUrl);*/

        /*fetch("http://192.168.160.73:8080/", {
            method: 'GET',
            body: url,
        })
            .then(response => response.json())
            .then(data => this.setState({hits: data, isLoading: false}));*/
    }



    render() {
        const { hits, isLoading } = this.state;
        //{console.log(hits)}
        return (
            <div className="App">
                <Navbar/>
                <SearchBar
                    onSubmit={this.handleSubmit}
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
