import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, registerUser, reloadUser } from '../redux/actions/userActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faUserAlt, faKey } from '@fortawesome/free-solid-svg-icons'

export class UserLogin extends Component {
    state = {
      login: true,
      name: '',
      email: '',
      userId: '',
      password: '',
    };

  login(e) {
    e.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.login(data, this.props);
  }

  register(e) {
    e.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    }
    this.props.register(data, this.props);
  }

  render () {
    const { login, email, password, name } = this.state

    return (
      <div className="login-container">
        <div className="login-wrap-form">
          <div className="login-form-title" >
          {login ? 'Login' : 'Sign Up'}
          </div>
          <form className="login-form validate-form" onSubmit={this.handleSubmit} >
            {!login && (
              <div className="wrap-inputText validate-input">
                  <input
                    value={name}
                    onChange={e => this.setState({ name: e.target.value })}
                    type="text"
                    placeholder="Your name"
                    className="inputText"
                    name="name"
                  />
                <span className="focus-inputText"></span>
                <label className="label-inputText" htmlFor="name">
                    <FontAwesomeIcon icon={faUserAlt} />
                </label>
              </div>
            )}
            <div className="wrap-inputText validate-input">
              <input
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                type="text"
                placeholder="Your email address"
                className="inputText"
                name="email"
              />
              <span className="focus-inputText"></span>
              <label className="label-inputText" htmlFor="email">
                  <FontAwesomeIcon icon={faAt} />
              </label>
            </div>
            <div className="wrap-inputText validate-input">
              <input
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                placeholder="Choose a safe password"
                className="inputText"
                name="password"
              />
              <span className="focus-inputText"></span>
              <label className="label-inputText" htmlFor="password">
                  <FontAwesomeIcon icon={faKey} />
              </label>
            </div>
            <div>
              <button className="login-form-btn" onClick={login ? this.login.bind(this) : this.register.bind(this)}>
                {login ? 'login' : 'create account'}
              </button>
              <span> </span>
              <div className="login-form-btn"
                onClick={() => this.setState({ login: !login })}
              >
                {login
                  ? 'need to create an account?'
                  : 'already have an account?'}
              </div>
            </div>
            <div>
              { this.props.status && login && this.props.statusText }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }, ownProps) => {
  return {
    ...user,
    cookies: ownProps.cookies
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (params, props) => {
      dispatch(loginUser(params, props))
    },
    register: (params, props) => {
      dispatch(registerUser(params, props))
    },
    reload: (params) => {
      dispatch(reloadUser(params))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);