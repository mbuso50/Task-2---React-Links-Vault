import React from 'react';
import './InputField.css';

interface InputFieldProps {
    name?: string;
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    name,
    label,
    placeholder = '',
    value = '',
    onChange = () => { },
    type = 'text'
}) => {
    return (
        <div className="input-field">
            <label className="input-field__label">{label}</label>
            <input
                name={name}
                type={type}
                className="input-field__input"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;