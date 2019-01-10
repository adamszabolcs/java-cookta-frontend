import React, {Component} from 'react';
import Checkbox from "./Checkbox";


const HEALTH_FILTER = ["Gluten", "Soy", "Peanuts", "Fish", "Dairy", "Shellfish", "Eggs", "Tree Nuts", "Wheat"];
const DIET_FILTERS = ["Vegetarian", "Paleo", "Low-Fat", "Low-Carb", "Low-Sodium", "Balanced"];

export class FilterBar extends Component {
    /*


    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        Object.keys(this.state.checkboxes)
            .filter(checkbox => this.state.checkboxes[checkbox])
            .forEach(checkbox => {
                console.log(checkbox, "is selected.");
            });

        Object.keys(this.state.checkboxes2)
            .filter(checkbox => this.state.checkboxes2[checkbox])
            .forEach(checkbox => {
                console.log(checkbox, "is selected.");
            });
    };*/


    /*handleCheckboxChange = changeEvent => {
        const {name} = changeEvent.target;

        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }));

        this.setState(prevState => ({
            checkboxes2: {
                ...prevState.checkboxes2,
                [name]: !prevState.checkboxes2[name]
            }
        }));
    }*/

    createCheckbox = option => (
        <Checkbox
            filterType={"health"}
            label={option}
            free={"-free"}
            isSelected={this.props.checkboxes[option]}
            onCheckboxChange={this.props.handleCheckboxChange}
            key={option}
        />
    );

    createCheckbox2 = option => (
        <Checkbox
            filterType={"diet"}
            label={option}
            free={""}
            isSelected={this.props.checkboxes2[option]}
            onCheckboxChange={this.props.handleCheckboxChange}
            key={option}
        />
    );

    createCheckboxes = () => HEALTH_FILTER.map(this.createCheckbox);
    createCheckboxes2 = () => DIET_FILTERS.map(this.createCheckbox2);


    render() {
        return (
            <div className="container">
                <div className="row">
                    <h3 className="text-center col-sm-6"> ALLERGIES </h3>
                    <h3 className="text-center col-sm-6"> DIET </h3>
                </div>
                <div className="row filterBar">
                    <div className="col-sm-6 allergies border-right border-dark">
                        {this.createCheckboxes()}
                    </div>
                    <div className="col-sm-6 diet">
                        {this.createCheckboxes2()}
                    </div>

                </div>
            </div>
        );
    }
}