import React from 'react';
import './page-title.css';


const PageTitle = ({leftElements, children, rightElements}) => {
    return (
        <div className="page-title">
            <div className="page-title-element">{leftElements}</div>
            <div className="page-title-element"><h1 className="page-title-text">{children}</h1></div>
            <div className="page-title-element" style={{textAlign: "right"}}>{rightElements}</div>
        </div>
    );
};

export default PageTitle;
