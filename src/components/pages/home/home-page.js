import React from 'react';
import { compose } from 'redux';
import withAlgoBridgeConstantsService from '../../hoc/with-algobridge-constants-service';
import LinkList from '../../link-list';
import './home-page.css';


const HomePage = ({ algoBridgeConstantsService }) => {
    let menu = null;
    const links = algoBridgeConstantsService.links;
    if (!window.localStorage.getItem('authToken')) {
        menu = (
            <menu className='menu'>
                <LinkList links={[links.login, links.register]} />
            </menu>
        )
    }

    return (
        <>
            {menu}
            <div className='intro'>Hello on Algo Bridge</div>
        </>
    );
};

export default compose(
    withAlgoBridgeConstantsService()
)(HomePage);
