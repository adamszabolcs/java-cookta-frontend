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

        this.state = {
            hits: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch("https://api.edamam.com/search?q=chicken&app_id=5b5897f7&app_key=9ac6d44f07118d8a2bead5a790b270d5&from=0&to=10&calories=591-722&health=alcohol-free")
            .then(response => response.json())
            .then(data => this.setState({hits: data.hits, isLoading: false}));
    }


    handleSubmit = () => {
        let url = window.location.href;
        alert(url);
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
