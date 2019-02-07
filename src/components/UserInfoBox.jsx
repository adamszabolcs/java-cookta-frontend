import React, {Component} from 'react';
import {FilterBar} from "./FilterBar";
import {Recipes} from "./Recipes";
import axios from 'axios';


export class UserInfoBox extends Component {

    constructor(props) {
        super(props);

        this.saveIntoleranceChanges = this.saveIntoleranceChanges.bind(this);

        this.state = {
            recipes: [],
            isLoading: false
        }
    }

    componentDidMount() {

        this.setState({isLoading: true});
        //this.securedPing();

        let username = localStorage.getItem("username");

        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("accessToken"));

        const options = {
            method : 'GET',
            headers
        };

        const reqest = new Request("http://localhost:8080/favourites/" + username, options);

        /*fetch("http://localhost:8080/favourites/" + username, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })*/
        fetch(reqest)
            .then(response => response.json())
            .then(responseData => {
                    this.setState({
                        recipes: responseData, isLoading: false
                    });
                //}
            })
            .catch(error => {
                console.log('Error fetching and parsing data: ', error);
            });
    }

    securedPing() {
        const API_URL = "http://localhost:8080/favourites/" + localStorage.getItem("username");
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`};
        axios.get(API_URL, {headers})
            //.then(response => response.json())
            .then(responseData => this.setState({ recipes: responseData, isLoading: false }))
            .catch(error => this.setState({ recipes: error.message }));
    }

    saveIntoleranceChanges = event => {
        event.preventDefault();
        localStorage.setItem("diet", JSON.stringify(this.props.dietCheckboxes));
        localStorage.setItem("health", JSON.stringify(this.props.healthCheckboxes));

        let username = JSON.parse(localStorage.getItem("username"));

        fetch("http://localhost:8080/intolerance/" + username, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                diet: this.props.dietCheckboxes,
                health: this.props.healthCheckboxes,
            })
        }).then(() => console.log("lol"))
            .catch(error => {
                // this.setState({hits: []});
                console.log('Error fetching and parsing data: ', error);
            });

    };

    render() {

        return (
            <div>
                <div className="tm-container-outer tm-banner-bg">
                    <div className="container">
                        <br/>
                        <br/>
                        <div className="card col-xs-12 mx-auto">
                            <div className="card-header">
                                Set-up your intolerances
                            </div>

                            <FilterBar
                                dietCheckboxes={this.props.dietCheckboxes}
                                healthCheckboxes={this.props.healthCheckboxes}
                                handleCheckBoxChange={this.props.handleCheckBoxChange}
                            />
                            <br/>
                            <button type="submit" value="Login" className="btn btn-primary m-2"
                                    onClick={this.saveIntoleranceChanges}
                            >Save changes
                            </button>
                        </div>
                    </div>

                </div>
                <Recipes
                    recipes={this.state.recipes}
                    isLoading={this.state.isLoading}
                    isLoggedIn={this.props.isLoggedIn}
                    username={this.props.username}
                />
            </div>
        )
    }

}