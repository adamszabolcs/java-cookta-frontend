import React, {Component} from 'react';
import Recipe from './Recipe';

export class Recipes extends Component {


    render() {

        if (this.props.isLoading) {
            return <p>Loading ...</p>;
        }
        else if (this.props.recipes.length === 0 && !this.props.isLoading) {
            return <h1>Sorry, no search results!</h1>;
        }
        return (

            <div>
                {this.props.recipes.map(recipe =>
                    <Recipe
                        key={recipe.url}
                        label={recipe.label}
                        image={recipe.image}
                        ingredientLines={recipe.ingredientLines}
                        url={recipe.url}
                    />
                )}
            </div>
        )
    }

}