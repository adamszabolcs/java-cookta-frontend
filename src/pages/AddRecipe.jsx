import React, {Component} from 'react';

import Link from "react-router-dom/es/Link";
import '../App.css';
import '../templatemo-style.css';
import '../addrecipe.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const HEALTH_FILTER = ["Gluten", "Soy", "Peanut", "Fish", "Dairy", "Shellfish", "Egg", "Tree-Nut", "Wheat"];
const DIET_FILTERS = ["Vegetarian", "Paleo", "Low-Fat", "Low-Carb", "Low-Sodium", "Balanced"];

export default class AddRecipe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            healthInputs: 1,
            dietInputs: 1,
            label: "",
            ingredients: "",
            selectedFile: null,
            health: [],
            diet: [],
            filename: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleHealthOption = this.handleHealthOption.bind(this);
        this.updateHealthState = this.updateHealthState.bind(this);
        this.updateDietState = this.updateDietState.bind(this);
        this.handleDietOption = this.handleDietOption.bind(this);
    }

    handleHealthClick = () => {
        this.setState({healthInputs: this.state.healthInputs + 1});
        // let values = [].filter.call(select.options, o => o.selected).map(o => o.value);
        // this.setState({health: values});
        // console.log(this.state.health);
    };

    handleDietClick = () => {
        this.setState({dietInputs: this.state.dietInputs + 1});
    };


    createHealthSelect = () => {
        let healthInputs = [];

        for (let i = 0; i < this.state.healthInputs; i++) {
            healthInputs.push(
                <div className="health">
                    <label htmlFor="userName" className="inputLabel">Choose health label</label>
                    <select name="health" className="addRecipeDropdown" onChange={this.handleHealthOption}>
                        <option value="default" defaultValue={false}>No health label added</option>
                        {HEALTH_FILTER.map((health) =>
                            <option value={health}>{health}</option>
                        )};
                    </select>
                </div>)

        }
        return healthInputs;

    };

    updateHealthState = (newItem) => {
        let currentState = this.state.health;
        console.log("state before update");
        console.log(currentState);
        currentState.push(newItem);
        this.setState(currentState);
        console.log("state updated");
        console.log(this.state.health);

    };

    handleHealthOption(event) {
        let options = event.target.options;
        let indexOfSelected = event.target.options.selectedIndex;
        console.log(options[indexOfSelected].value);
        let newHealth = options[indexOfSelected].value;
        this.updateHealthState(newHealth);
    };

    createDietSelect = () => {
        let dietInputs = [];

        for (let i = 0; i < this.state.dietInputs; i++) {
            dietInputs.push(
                <div className="diet">
                    <label htmlFor="userName" className="inputLabel">Choose diet label</label>
                    <select name="diet" className="addRecipeDropdown" onChange={this.handleDietOption}>
                        <option value="default" defaultValue={false}>No diet label added</option>
                        {DIET_FILTERS.map((diet) =>
                            <option value={diet}>{diet}</option>
                        )};
                    </select>
                </div>)
        }
        return dietInputs;

    };

    handleDietOption(event) {
        let options = event.target.options;
        let indexOfSelected = event.target.options.selectedIndex;
        let newDiet = options[indexOfSelected].value;
        this.updateDietState(newDiet);
    }

    updateDietState = (newItem) => {
        let currentState = this.state.diet;
        currentState.push(newItem);
        this.setState(currentState);
    };

    handleUpload = event => {
        event.preventDefault();
        const data = new FormData();
        const fileUrl = "http://localhost:8080/uploadFile";
        const dataUrl = "http://localhost:8080/api/recipe";
        data.append('file', this.state.selectedFile);
        fetch(dataUrl, {
            method: 'POST',
            body: JSON.stringify({
                label: this.state.label,
                ingredientLines: this.state.ingredients,
                health: this.state.health,
                diet: this.state.diet,
                filename: this.state.selectedFile.name
            })
        });
        fetch(fileUrl, {
            method: 'POST',
            body: data,
        })
            .catch(error => {
                console.log(error);
            });
    };

    handleInputChange = event => {
        const {name} = event.target;

        switch (name) {
            case "recipeLabel":
                this.setState({label: event.target.value});
                break;
            case "ingredients":
                this.setState({ingredients: event.target.value});
                break;
        }
    };

    handleSelectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    };


    render() {

        return (
            <div className="addRecipeWrapper tm-container-outer tm-banner-bg">
                <div className="addRecipeBox">
                    <h1 className="recipeBoxTitle">Add new recipe</h1>
                    <form onSubmit={this.handleUpload}>
                        <div className="recipeLabel">
                            <label htmlFor="userName" className="inputLabel">Enter the recipe's title</label>
                            <input type="text"
                                   placeholder="Title"
                                   name="recipeLabel"
                                   className="addRecipeInput"
                                   onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="imageUpload">
                            <label htmlFor="userName" className="inputLabel">Upload a photo</label>
                            <input type="file"
                                   name="pic"
                                   accept="image/*"
                                   onChange={this.handleSelectedFile}
                            />
                        </div>

                        <div className="ingredients">
                            <label htmlFor="userName" className="inputLabel">Add ingredients</label>
                            <input type="text"
                                   placeholder="Ingredient"
                                   name="ingredients"
                                   className="addRecipeInput"
                                   onChange={this.handleInputChange}
                            />
                        </div>

                        {this.createHealthSelect()}
                        <div className="plusButton" onClick={this.handleHealthClick}>
                            <FontAwesomeIcon icon="plus-square"/>
                        </div>

                        {this.createDietSelect()}
                        <div className="plusButton" onClick={this.handleDietClick}>
                            <FontAwesomeIcon icon="plus-square"/>
                        </div>

                        <div className="recipeInstruction">
                            <label htmlFor="password" className="inputLabel">Add instructions</label>
                            <textarea type="text"
                                      rows="10"
                                      cols="30"
                                      placeholder="Instructions"
                                      name="recipeInstruction"
                                      className="addRecipeInput"
                                      onChange={this.handleInputChange}
                            />
                        </div>

                        <div>
                            <Link to="/">
                                <button type="submit" className="createRecipeButton">Create
                                    recipe
                                </button>
                            </Link>
                        </div>


                    </form>
                </div>

            </div>
        );
    }
}