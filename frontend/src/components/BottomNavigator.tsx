import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    line: string; 
    label: string;
    className: string;
    page: string
}

const BottomNavigator: React.FC<Props> = ({ line, label, page, className }) => {

    const navigate = useNavigate()

    return (
        <div className="flex justify-center mt-2">
            <p className="mr-2">{line}</p>
            <a onClick={() => navigate(page)} className={className}>{label}</a>
        </div>
    );
}

export default BottomNavigator;
