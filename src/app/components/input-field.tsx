import React, { ChangeEvent } from 'react';

interface InputFieldProps {
    label?: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MMInputField: React.FC<InputFieldProps> = (
    { 
        label, 
        type = 'text', 
        placeholder, 
        value, 
        onChange
    }) => {
    return (
        <div className="mm-input-field">
            {label && <label>{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};


export default MMInputField;
