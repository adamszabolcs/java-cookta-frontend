import React, {Component} from 'react';

import '../App.css';
import '../templatemo-style.css';
import '../addrecipe.css';

const HEALTH_FILTER = ["Gluten", "Soy", "Peanut", "Fish", "Dairy", "Shellfish", "Egg", "Tree-Nut", "Wheat"];
const DIET_FILTERS = ["Vegetarian", "Paleo", "Low-Fat", "Low-Carb", "Low-Sodium", "Balanced"];

export default class AddRecipe extends Component {

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

                        <div className="health">
                            <label htmlFor="userName" className="inputLabel">Choose health label(s)</label>
                            <select name="health" className="addRecipeDropdown">
                                    <option value="default" selected>No health label added</option>
                                {HEALTH_FILTER.map((health) =>
                                    <option value="health">{health}</option>
                                )};
                            </select>
                        </div>

                        <div className="diet">
                            <label htmlFor="userName" className="inputLabel">Choose diet label(s)</label>
                            <select name="diet" className="addRecipeDropdown">
                                <option value="default" selected>No diet label added</option>
                                {DIET_FILTERS.map((diet) =>
                                    <option value="health">{diet}</option>
                                )};
                            </select>
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