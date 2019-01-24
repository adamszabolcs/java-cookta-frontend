import React from "react";

const Checkbox = ({ label,free, isSelected, onCheckboxChange }) => (
    <div className="form-check">
        <label>
            <input
                type="checkbox"
                name={label}
                defaultValue={label.toLowerCase() + free}
                checked={isSelected}
                onChange={() => onCheckboxChange(label)}
                className="form-check-input"
            />
            {label}
        </label>
    </div>
);

export default Checkbox;