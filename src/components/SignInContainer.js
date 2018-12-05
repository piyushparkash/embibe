import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './../styles/loginContainer.css'

class SignInContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: false,
      loggedIn: false
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
      error: false
    })
  }

  handlePasswordChange(e) {

    this.setState({
      password: e.target.value,
      error: false
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    //Check if username password is correct
    if (this.state.username == 'embibe' && this.state.password == 'embibe') {
      //Set the cookie to tell that user is logged in
      document.cookie='login=true';

      //Redirect to dashboard page by setting the logged in Cookie
      this.setState({
        loggedIn: true
      })

    } else {
      //Username and password is incorrect
      this.setState({
        error: true
      })
    }

    return false;
  }


  render() {

    if (this.state.username && this.state.password && this.state.loggedIn === true) {
      //Redirect to home
      return (
        <Redirect push to='/home' />
      )
    }
    return (
      <div className="loginContainer">
          <h2>Please login to enter</h2>
          <form onSubmit={this.handleSubmit} method='post'>
            <div>
              <input placeholder="Username" onChange={this.handleUsernameChange} value={this.state.username} />
            </div>
            <div>
              <input type='password' placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
            </div>
            {this.state.error && <div className='error'>Invalid Credentials</div>}
            <div>
              <button type='submit'>Login</button>
            </div>
          </form>
      </div>
    );
  }
}

export default SignInContainer;
