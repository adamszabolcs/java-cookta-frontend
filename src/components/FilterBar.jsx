import React, {Component} from 'react';
import Checkbox from "./Checkbox";


const ALLERGIES_FILTER = ["Gluten", "Soy", "Peanuts"];
const DIET_FILTERS = ["Vegetarian", "Paleo", "Low-Fat"];

export class FilterBar extends Component {
    state = {
        checkboxes: ALLERGIES_FILTER.reduce(
            (options, option) => ({
                ...options,
                [option]: false
            }),
        ),
        checkboxes2: DIET_FILTERS.reduce(
            (options, option) => ({
                ...options,
                [option]: false
            }),
        )
    };


    handleCheckboxChange = changeEvent => {
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
    };


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
    };

    createCheckbox = option => (
        <Checkbox
            label={option}
            isSelected={this.state.checkboxes[option]}
            onCheckboxChange={this.handleCheckboxChange}
            key={option}
        />
    );

    createCheckbox2 = option => (
        <Checkbox
            label={option}
            isSelected={this.state.checkboxes2[option]}
            onCheckboxChange={this.handleCheckboxChange}
            key={option}
        />
    );

    createCheckboxes = () => ALLERGIES_FILTER.map(this.createCheckbox);
    createCheckboxes2 = () => DIET_FILTERS.map(this.createCheckbox2);


    render() {
        return (
            <div className="container">
                    <div className="row filterBar">
                        <div className="col-sm-6 allergies">
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