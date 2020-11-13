import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className='headerContainer'>
        <span className='usernameContainer'>
          {this.context.user.name}
        </span>
        <nav className='logoutNav'>
          <Link 
            className='navLink'
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav className='loginNav'>
        <Link className='navLink' to='/login'>Login</Link>
        {' '}
        <Link className='navLink' to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header>
        <h1>
          <Link className='headerLink' to='/'>
            Spaced repetition
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
