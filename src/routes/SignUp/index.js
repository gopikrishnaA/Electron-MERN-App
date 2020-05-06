import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button, Form } from 'react-bootstrap'
import { register } from '../../actions'
import Header from '../../components/Header'
import './signup.css'
class Pure extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    password2: '',
    error: {}
  }

  handleChange = (event, key) => {
    const value = event.target.value
    const errorKey = `${[key]}Error`;
    this.setState({
      [key]: value,
      error: {
        [errorKey]: ''
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {
      email,
      username,
      password,
      password2
    } = this.state
    let error = {};
    if (email.length === 0) {
      error.emailError = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.emailError = 'Email is not valid'
    } else if (username.length === 0) {
      error.usernameError = 'Username is required'
    } else if (username.length < 6) {
      error.usernameError = 'Username should be 6 letters'
    } else if (password.length === 0) {
      error.passwordError = 'Password is required'
    } else if (password.length < 6) {
      error.passwordError = 'Password should be 6 letters'
    } else if (password2.length === 0) {
      error.password2Error = 'Password is required'
    } else if (password2.length < 6) {
      error.password2Error = 'Password should be 6 letters'
    } else if (password !== password2) {
      error.password2Error = 'Passwords does not match'
    } else {
      this.props.register({
        email,
        username,
        password,
        password2
      })
    }
    this.setState({
      error
    })
  }

  render () {
    const {
      email,
      username,
      password,
      password2,
      error
    } = this.state
    return (
      <>
        <Header goBack={this.props.navigate}/>
        <div className='signup-bar'>
          <div className='signup-box'>
            <h3 className='signup-title'>Sign-Up</h3>
            <Form noValidate onSubmit={this.handleSubmit}
              style={{ width: '100%' }}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => this.handleChange(e, 'email')}
                  isInvalid={!!error.emailError}
                />
                <Form.Control.Feedback type="invalid">
                  {error.emailError}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicUser">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => this.handleChange(e, 'username')}
                  isInvalid={!!error.usernameError}
                />
                <Form.Control.Feedback type="invalid">
                  {error.usernameError}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => this.handleChange(e, 'password')}
                  isInvalid={!!error.passwordError} />
                <Form.Control.Feedback type="invalid">
                  {error.passwordError}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicRePassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={(e) => this.handleChange(e, 'password2')}
                  isInvalid={!!error.password2Error} />
                <Form.Control.Feedback type="invalid">
                  {error.password2Error}
                </Form.Control.Feedback>
              </Form.Group>
              <Button className='submitBtn' variant="primary" type="submit">
                Sign-Up
            </Button>
            </Form>
          </div>
        </div>
      </>
    )
  }
}

const state = ({}) => ({
})

const dispatch = (dispatch) => ({
  register: (payload) => dispatch(register(payload)),
  navigate: () => dispatch(push('/login'))
})

Pure.propTypes = {
  navigate: PropTypes.func,
  register: PropTypes.func
}

export const SignUpPage = connect(state, dispatch)(Pure)
