import React from "react";

const FormField = (props) => {
    return (
        <div>
            <label>
                {props.labelText}
                <input {...props.input} name={props.name} />
            </label>
        </div>
    );
};

export default FormField;
