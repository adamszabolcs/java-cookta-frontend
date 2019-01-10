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
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch("http://localhost:8080/api")
            .then(response => response.json())
            .then(data => this.setState({hits: data, isLoading: false}));
    }


    // handleFormSubmit = () => {
    //     let url = document.location.href;
    //     // axios.get(url, url).then(response => response.json());
    //     axios.get(url).then(response => {
    //         console.log(response.data[0].image);
    //         // alert(response.data);
    //         this.setState({hits: response.data, isLoading: false});
    //         console.log(this.state.hits[0].image);
    //
    //         // return response.data
    //     })
    // }

    updateState = data => {
        this.setState({hits: data, isLoading: false});
        console.log(this.state.hits)
    }


    render() {
        const { hits, isLoading, handleFormSubmit } = this.state;
        //{console.log(hits)}
        return (
            <div className="App">
                <Navbar/>
                <SearchBar
                updateData={this.updateState.bind(this)}/>
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
