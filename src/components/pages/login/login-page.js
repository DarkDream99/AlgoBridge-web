import React, {Component} from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';

import AlgoSpinner from "../../spinner";
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import PageTitle from '../../page-title';

import withAlgoBridgeConstantsService from '../../hoc/with-algobridge-constants-service';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import withErrorIndicator from '../../hoc/with-error-indicator';
import withLoading from '../../hoc/with-loading';

import './login-page.css';


class LoginPage extends Component {
    render = () => {
      const {algoBridgeConstantsService, loading, error} = this.props;
      let loader = this._getLoader(loading);

      const links = algoBridgeConstantsService.links;
      return (
          <>
              <menu className="links">
                  <LinkList links={[links.home, links.register]} />
              </menu>
              <PageTitle>
                  Login
              </PageTitle>
              <IdentificationBody
                  actionText='Login'
                  action={this.onLogin}
                  loader={loader}
                  errorMessage={error}
               />
          </>
      );
    }

    onLogin = (username, password) => {
        const {algoBridgeService, swapLoading, setError} = this.props;
        swapLoading(true);
        setError('');

        algoBridgeService.loginUser(username, password)
            .then((res) => {
                swapLoading(false);
                if (res.token && res.token.length > 0) {
                    this.props.algoBridgeService.userInfo(res.token).then(
                        (result) => {
                            this.props.login(res.token, result.user);
                            this.props.history.push('/user-home/');
                        }
                    ).catch((error) => {
                        console.log(error);
                    });
                } else {
                    setError('Username or password is not correct. Check and try again.');
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
    };

    _getLoader(loading) {
        return loading ? <AlgoSpinner /> : null;
    }
}


export default compose(
    withRouter,
    withAlgoBridgeService(),
    withAlgoBridgeConstantsService(),
    withLoading(),
    withErrorIndicator(),
)(LoginPage);
