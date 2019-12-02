import React from 'react';
import {connect} from 'react-redux';
import LinkList from '../../link-list';
import './home-page.css';


const HomePage = ({links: linkListObj}) => {
    return (
        <>
            <menu className='menu'>
                <LinkList linkListObj={linkListObj} />
            </menu>
            <div>Hello on Algo Bridge</div>
        </>
    );
};

const mapStateToProps = ({links}) => {
    return {
        links: [
            links.login,
            links.signup,
        ]
    } 
};

export default connect(mapStateToProps)(HomePage);
