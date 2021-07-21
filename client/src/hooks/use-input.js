import { useState } from "react";

export const useInput = (initialValue, isCheckbox = false) => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        bind: {
            value,
            onChange: (event) => {
                const val = event.target.value;
                if (isCheckbox) {
                    const checked = event.target.checked;
                    setValue(checked);
                } else setValue(val);
            },
        },
    };
};
