import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
      super(props)
    }
    render() {
      return(
      <div className="login-form">
              <h2 className="text-center">Please Log in with Twitter</h2>   
             <div className="form-group">
                  <button type="button" onClick={this.props.login} className="btn btn-primary btn-block">Log in</button>
              </div>
      </div>
      )   
    }   
} 