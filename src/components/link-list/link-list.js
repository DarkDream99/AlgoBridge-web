import React from 'react';
import {Link} from 'react-router-dom';

import './link-list.css';


const LinkList = ({links}) => {
    const linksCount = links.length;
    const linkList = links.map((link, idx) => {
        const linkComponent = (<Link  to={link.href}>{link.label}</Link>);
        let divider = null;
        if (idx + 1 !== linksCount) {
            divider = '|';   
        }

        return (
            <span key={link.label}>
                {linkComponent}
                {divider}
            </span>
        );
    });

    return (
        <div className="link-list-container">
            <pre>
                {linkList}
            </pre>
        </div>
    );
};

export default LinkList;
