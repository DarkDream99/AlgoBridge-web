import React from 'react';
import PropTypes from 'prop-types';
import './page-title.css';


const PageTitle = ({children}) => {
    return (
        <h1 className="page-title">{children}</h1>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PageTitle;
