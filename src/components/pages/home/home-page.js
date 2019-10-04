import React from 'react';
import LinkList from '../../link-list';
import './home-page.css';


const HomePage = () => {
    const linkListObj = [
        {
            href: '/login',
            label: 'Login',
        }, {
            href: '/signup',
            label: 'Signup',
        }
    ];

    return (
        <>
            <menu className='menu'>
                <LinkList linkListObj={linkListObj} />
            </menu>
            <div>Hello on Algo Bridge</div>
        </>
    );
}

export default HomePage;
