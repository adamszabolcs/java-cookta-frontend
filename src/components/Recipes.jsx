import React, {Component} from 'react';
import Recipe from './Recipe';

export class Recipes extends Component {
    state = {
        recipes : [
            {id: 1, recipe: "Első recept"},
            {id: 2, recipe: "Masodik recept"},
            {id: 3, recipe: "Harmadik recept"},
            {id: 4, recipe: "Negyedik recept"}
        ]
    }

    render() {

        return (
            <div>
                {this.state.recipes.map(recipe =>
                    <Recipe
                        key={recipe.id}
                        recipe={recipe.recipe}
                    />
                )}
            </div>
        )
    }
}