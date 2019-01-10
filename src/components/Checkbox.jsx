import React, {Component} from 'react';


class Checkbox extends Component {

    /*
    const Checkbox = ({filterType ,label ,free ,isSelected, onCheckboxChange }) => (
    */
    /*constructor(){
        super();
        this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    }*/

    /*onCheckBoxChange(e){
        this.props.onCheckBoxChange(e.target.value);
    }*/

    render() {
        const {filterType, label, free, isSelected, handleCheckBoxChange} = this.props;
        return (
            <div className="form-check">
                <label>
                    <input
                        type="checkbox"
                        name={label}
                        value={label.toLowerCase() + free}
                        checked={isSelected}
                        onChange={handleCheckBoxChange}
                        className="form-check-input"
                    />
                    {label}
                </label>
            </div>
        );
    }
}

export default Checkbox;