import { useState } from "react";

export const useRadio = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        bind: {
            onChange: (event) => {
                setValue(event.target.value);
            },
        },
    };
};
