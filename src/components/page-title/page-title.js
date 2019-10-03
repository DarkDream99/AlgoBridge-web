import React from 'react';
import './page-title.css';


const PageTitle = ({title}) => {
    console.log(title);
    return (
        <h1 className="page-title">{title}</h1>
    );
}

export default PageTitle;
