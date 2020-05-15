import React from 'react';
import {connect} from 'react-redux';
import LinkList from '../../link-list';
import './home-page.css';


const HomePage = ({links}) => {
    let menu = null;
    if (!window.localStorage.getItem('authToken')) {
        menu = (
            <menu className='menu'>
                <LinkList links={links} />
            </menu>
        )
    }

    return (
        <>
            {menu}
            <div>Hello on Algo Bridge</div>
        </>
    );
};

const mapStateToProps = ({links}) => {
    return {
        links: [
            links.login,
            links.register,
        ],
    } 
};

export default connect(mapStateToProps)(HomePage);
