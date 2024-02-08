import React from "react";

interface Props {
    label: string; 
    className: string;
}

const Button: React.FC<Props> = ({ label, className }) => {
    return (
        <button className={className}>{label}</button>
    );
}

export default Button;
