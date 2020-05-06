import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { login } from '../../actions'
import './login.css'
import smileIcon from '../../assets/smily.gif'
class Pure extends Component {
  state = {
    email: '',
    password: '',
    error: {},
    loginStyle: 'login-bar'
  }

  handleChange = (event, key) => {
    const value = event.target.value
    const errorKey = `${[key]}Error`;
    this.setState({
      [key]: value,
      loginStyle: 'login-bar',
      error: {
        [errorKey]: ''
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {
      email,
      password
    } = this.state
    let error = {};
    if (email.length === 0) {
      error.emailError = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.emailError = 'Email is not valid'
    } else if (password.length === 0) {
      error.passwordError = 'Password is required'
    } else if (password.length < 6) {
      error.passwordError = 'Password should be 6 letters'
    } else {
      this.props.login({
        email,
        password
      })
    }
    const loginStyle = Object.keys(error).length === 0
      ? 'login-bar' : 'login-bar headShake'
    this.setState({
      error,
      loginStyle
    })
  }

  render () {
    const {
      email,
      password,
      error,
      loginStyle
    } = this.state
    return (

      <div className={loginStyle} >
        <div className='login-box'>
          <img className='login-img' src={smileIcon} />
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
            <Button className='submitBtn' variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

const state = ({ jokes }) => ({
  joke: jokes.joke,
  id: jokes.id
})

const dispatch = (dispatch) => ({
  login: (payload) => dispatch(login(payload))
})

Pure.propTypes = {
  login: PropTypes.func
}

export const LoginPage = connect(state, dispatch)(Pure)
