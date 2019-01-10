import React from "react";

const Checkbox = ({filterType ,label ,free ,isSelected ,onCheckboxChange }) => (
    <div className="form-check">
        <label>
            <input
                type="checkbox"
                name={label.toLowerCase()+free}
                value={label.toLowerCase()+free}
                checked={isSelected}
                onChange={onCheckboxChange}
                className="form-check-input"
            />
            {label}
        </label>
    </div>
);

export default Checkbox;