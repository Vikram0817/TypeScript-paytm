import React from "react";

interface Props {
    label: string; 
    className: string;
}

const Input: React.FC<Props> = ({ label, className }) => {
    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input className={className}></input>
        </>
    );
}

export default Input;