import React from "react";

const FormField = (props) => {
    return (
        <div>
            <label>
                {props.labelText}
                {
                    props.input.type !== 'textarea'
                    ? <input {...props.input} name={props.name} />
                    : <textarea {...props.input} name={props.name} />
                }
                
            </label>
        </div>
    );
};

export default FormField;
