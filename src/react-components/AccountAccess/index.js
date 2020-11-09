import React from 'react'
import './style.css'

import Login from '../Login'
import Signup from '../Signup'
import NavBar from '../NavBar'
import Footer1 from '../Footer1'

// Holds signup and login pages
class AccountAccess extends React.Component {
  render () {
    // Display the correct form
    const getForm = (isLoginView) => {
      if (isLoginView) {
        return <Login />
      } else {
        return <Signup />
      }
    }

    return (
      <div id='accessBody'>
        <NavBar />
        <div id='accessForm'>
          <h2>{(this.props.isLoginView ? 'Log In' : 'Sign Up')}</h2>
          {getForm(this.props.isLoginView)}
        </div>
        <Footer1 />
      </div>
    )
  }
}

export default AccountAccess
