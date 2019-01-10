import React, {Component} from 'react';
import Recipe from './Recipe';

export class Recipes extends Component {


    render() {

        if (this.props.isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
                {this.props.recipes.map(recipe =>
                    <Recipe
                        key={recipe.recipe.label}
                        label={recipe.recipe.label}
                        image={recipe.recipe.image}
                        ingredientLines={recipe.recipe.ingredientLines}
                        url={recipe.recipe.url}
                    />
                )}
            </div>
        )
    }
}