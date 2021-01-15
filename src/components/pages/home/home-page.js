import React from 'react';
import { compose } from 'redux';
import withAlgoBridgeConstantsService from '../../hoc/with-algobridge-constants-service';
import LinkList from '../../link-list';

import landing_tools_img from '../../../images/landing-tools.png';

import './home-page.scss';


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
            <div className='container flex-block' style={{ marginTop: '3%' }}>
              <div id='landing-title'>
                <h1 className='intro'>Algo Bridge</h1>
                <hr />
                <div>The system for fast and efficient algorithm design </div>
              </div>

              <div id='landing-tools'>
                <img src={landing_tools_img} alt='Workground'/>
              </div>
            </div>

            <div id='landing-facilities'>
              <h2 className='label'>Best we provide</h2>
              <div className='flex-block'>
                <div className='landing-facility'>
                    <h3>Pseudo code</h3>
                    <ul><li>Design your own version of the pseudo code and working with abundance of the heart</li></ul>
                </div>
                <div className='landing-facility'>
                    <h3>Convinient IDE</h3>
                    <ul>
                      <li>Create your algorithm without any installation. You need just Internet connection and web browser</li>
                      <hr/>
                      <li>No need to learn a lot of instuctions and ruls. Just abstractions, just your thoughts!</li>
                    </ul>
                </div>
                <div className='landing-facility'>
                    <h3>Visualization</h3>
                    <ul>
                      <li>No need a lot of drawing! Just select target structure and set to which structure you want to convert (for example array to binary heap and so on)</li>
                      <hr/>
                      <li>Control all changes of the data flow</li>
                      <hr/>
                      <li>Navigate between code and online visualization</li>
                    </ul>
                </div>
              </div>
            </div>

            <div id='landing-how-to'>
              <h2 className='label'>How to use</h2>
              <ol>
                <li>Select algorithm that already exist or create new one:</li>
                <li>To edit algorithm go to the edit mode:</li>
                <li>To edit operation, select the row (in the edit mode):</li>
                <li>Do not forget to save your changes:</li>
                <li>Visualize the algorithm in visual mode:</li>
              </ol>
            </div>

            <div id='landing-how-it-works'>
              <h2 className='label'>How it works</h2>
              <div>Will be added soon</div>
            </div>

            <footer>
              <div>2019-2021 © <a href='https://github.com/zaldis'>Denys Zaluzhnyi</a>, <a href='https://github.com/Bratyun'>Roman Brestovetskiy</a></div>
            </footer>
        </>
    );
};

export default compose(
    withAlgoBridgeConstantsService()
)(HomePage);
