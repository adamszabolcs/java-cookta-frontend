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
                        key={recipe.label}
                        label={recipe.label}
                        image={recipe.image}
                        ingredientLines={recipe.ingredientLines}
                    />
                )}
            </div>
        )
    }
}