import React from "react";

interface Props {
    label: string; 
    className: string;
    onClick: () => void;
}

const Button: React.FC<Props> = ({ onClick, label, className }) => {
    return (
        <button onClick={onClick} className={className}>{label}</button>
    );
}

export default Button;
