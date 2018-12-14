import React from 'react';

export const CheckBox = props => {
    return (
        <div>
            <input
                name={props.name}
                type="checkbox"
                checked={props.isChecked}
                onChange={props.onCheckChange}
            />
            {props.value}
        </div>
    )
}

export default CheckBox;