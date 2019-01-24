import React, {Component} from 'react';
import {FilterBar} from "./FilterBar";
import {Recipes} from "./Recipes";

export class UserInfoBox extends Component {

    constructor(props){
        super(props)

        this.state ={
            recipes: [],
            isLoading: false
        }
    }

    render() {

        return (
            <div className="tm-container-outer tm-banner-bg">
                <div className="container">
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
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Recipes
                    recipes={this.state.recipes}
                    isLoading={this.state.isLoading}
                />
            </div>
        )
    }

}