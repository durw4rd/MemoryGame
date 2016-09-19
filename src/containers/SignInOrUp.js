// src/containers/SignInOrUp

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import setFormErrors from '../actions/set-form-errors'
import resetFormErrors from '../actions/reset-form-errors'

const errorMargin = {
  marginTop: '2rem'
}

const dialogStyle = {
  width: '400px',
  margin: '50px auto',
  padding: '2rem',
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
}

class SignInOrUp extends Component {
  constructor() {
    super()

    this.state = {
      signUp: false,
    }
  }

  submitForm() {
    if (this.state.signUp) { return this.registerUser() }
    return this.signInUser()
  }

  registerUser() {
    this.props.resetFormErrors()

    const { name, email, password, passwordConfirmation } = this.formValues()

    if (password !== passwordConfirmation) {
      // set a formError! (and return)
      return this.props.setFormErrors({
        passwordConfirmation: 'Passwords do not match!'
      })
    }

    // continue to register the user somehow
  }

  signInUser() {
    console.log("Sign in User!")
  }

  formValues() {
    const { name, email, password, passwordConfirmation } = this.refs
    return {
      name: name && name.getValue(),
      email: email.getValue(),
      password: password.getValue(),
      passwordConfirmation: passwordConfirmation && passwordConfirmation.getValue(),
    }
  }

  toggleSignUp() {
    this.setState({
      signUp: !this.state.signUp
    })
  }

  render() {
    const { signUp } = this.state

    return(
      <Paper style={ dialogStyle }>
        <h2>{ signUp ? 'Sign Up' : 'Sign In' }</h2>
        <div>
          { signUp ? <TextField ref="name" hintText="Your name"/> : null }
        </div>
        <div>
          <TextField
            type="email"
            ref="email"
            hintText="Your email" />
        </div>
        <div>
          <TextField type="password" ref="password" hintText="Your password"/>
        </div>
        <div>
          { signUp ?
            <TextField
              type="password"
              ref="passwordConfirmation"
              hintText="Repeat your password"
              errorText={ this.props.errors.passwordConfirmation } />
          : null }
        </div>
        <div style={ errorMargin }>
          <FlatButton
            onClick={ this.toggleSignUp.bind(this) }
            label={ signUp ? 'Sign in' : 'Sign up' } />

          <RaisedButton
            style={ buttonStyle }
            onClick={ this.submitForm.bind(this) }
            label={ signUp ? 'Sign up' : 'Sign in' }
            primary={true} />
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.formErrors,
  }
}

export default connect(mapStateToProps, { setFormErrors, resetFormErrors })(SignInOrUp)
