import React, {Component} from 'react';

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
            dietInputs: 1
        }
    }

    handleHealthClick = () => {
        this.setState({healthInputs: this.state.healthInputs + 1});
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
                <select name="health" className="addRecipeDropdown">
                    <option value="default" defaultValue={false}>No health label added</option>
                    {HEALTH_FILTER.map((health) =>
                        <option value={health}>{health}</option>
                    )};
                </select>
            </div>)
        }
        return healthInputs;

    };

    createDietSelect = () => {
        let dietInputs = [];

        for (let i = 0; i < this.state.dietInputs; i++) {
            dietInputs.push(
                <div className="diet">
                    <label htmlFor="userName" className="inputLabel">Choose diet label</label>
                    <select name="diet" className="addRecipeDropdown">
                        <option value="default" defaultValue={false}>No diet label added</option>
                        {DIET_FILTERS.map((diet) =>
                            <option value="health">{diet}</option>
                        )};
                    </select>
                </div>)
        }
        return dietInputs;

    };



    render() {

        return (
            <div className="addRecipeWrapper tm-container-outer tm-banner-bg">
                <div className="addRecipeBox">
                    <h1 className="recipeBoxTitle">Add new recipe</h1>
                    <form>
                        <div className="recipeLabel">
                            <label htmlFor="userName" className="inputLabel">Enter the recipe's title</label>
                            <input type="text"
                                   placeholder="Title"
                                   name="recipeLabel"
                                   className="addRecipeInput"
                            />
                        </div>

                        <div className="imageUpload">
                            <label htmlFor="userName" className="inputLabel">Upload a photo</label>
                            <input type="file"
                                   name="pic"
                                   accept="image/*"
                            />
                        </div>

                        <div className="ingredients">
                            <label htmlFor="email" className="inputLabel">Add ingredients</label>
                            <input type="text"
                                   placeholder="Ingredient"
                                   name="ingredients"
                                   className="addRecipeInput"
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
                            />
                        </div>


                    </form>
                </div>

            </div>
        );
    }

}