import React from "react";

interface Props {
    pageHeading: string; 
    className: string;
}

const Heading: React.FC<Props> = ({ pageHeading, className }) => {
    return (
        <h1 className={className}>{pageHeading}</h1>
    );
}

export default Heading;
