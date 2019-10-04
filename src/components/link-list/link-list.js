import React from 'react';
import {Link} from 'react-router-dom';


const LinkList = ({linkListObj}) => {
    const linksCount = linkListObj.length;
    const linkList = linkListObj.map((link, idx) => {
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
        <div className="bottom-links">
            <pre>
                {linkList}
            </pre>
        </div>
    );
};

export default LinkList;
