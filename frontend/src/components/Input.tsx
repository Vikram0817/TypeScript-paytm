import React, { ChangeEvent } from "react";

interface Props {
    label: string; 
    className: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<Props> = ({value, onChange, label, className }) => {
    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input value={value} onChange={onChange} className={className}></input>
        </>
    );
}

export default Input;