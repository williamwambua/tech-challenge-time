import React, { Component } from 'react'
import history from './history';

class header extends Component {
  removeCookies(cookies) {
    cookies.remove('auth-token', { path: '/'});
    cookies.remove('name', { path: '/'});
    cookies.remove('email', { path: '/'});
    cookies.remove('userId', { path: '/'});

    history.push('/');
  }

  render() {
    const { cookies } = this.props;
    const authToken = cookies.get('auth-token');
    const name = cookies.get('name');

    return (
      <div className={name ? "header-nav" : "header-nav-logged-out"}>
        <div className="app-title">Session Tracker</div>
        {name && (
          <>
            <div className="header-nav-spacer"> | </div> 
            <div className="header-nav-item">
              Hi {name}!
            </div>
            <div className="header-nav-spacer"> | </div>
          </>
        )}
        <div className="header-nav-item">
          {authToken && (
            <div
              className="header-nav-link"
              onClick={() => {
                this.removeCookies(cookies)
              }}
            >
              logout
            </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default header