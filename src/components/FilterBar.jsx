import React, {Component} from "react";
import Checkbox from "./Checkbox";

const HEALTH_FILTER = ["Gluten", "Soy", "Peanut", "Fish", "Dairy", "Shellfish", "Egg", "Tree-Nut", "Wheat"]; // code duplication
const DIET_FILTERS = ["Vegetarian", "Paleo", "Low-Fat", "Low-Carb", "Low-Sodium", "Balanced"];

export class FilterBar extends Component {
    createCheckbox = option => (
        <Checkbox
            label={option}
            free={"-free"}
            isSelected={this.props.checkboxes[option]}
            onCheckboxChange={this.props.handleCheckBoxChange}
            key={option}
        />
    );


    createCheckbox2 = option => (
        <Checkbox
            label={option}
            free={""}
            isSelected={this.props.checkboxes[option]}
            onCheckboxChange={this.props.handleCheckBoxChange}
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
