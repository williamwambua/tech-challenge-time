import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import Header from './header'
import UserLogin from './userLogin'

import SessionListContainer from '../containers/sessionListContainer';

class App extends Component {

    render() {
        const authToken = this.props.cookies.get('auth-token');
        return (
            <div>
                <Header cookies={this.props.cookies} />
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/login" />} />
                        <Route exact path="/login" render={() => <UserLogin cookies={this.props.cookies} />} />
                        <Route exact path='/sessions' render={() => authToken ? <SessionListContainer cookies={this.props.cookies} /> : <Redirect to="/login" /> } />
                    </Switch>
            </div>
        );
    }
}

export default withCookies(App);
