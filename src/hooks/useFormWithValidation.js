import { useState, useCallback } from "react";

export function useFormWithValidation(defaultValues = {}) {
    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const isCheckbox = target.type === 'checkbox'
        const name = target.name;
        const value = isCheckbox ? target.checked : target.value;

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };

    return { values, errors, isValid, handleChange, setValues, setIsValid };
}