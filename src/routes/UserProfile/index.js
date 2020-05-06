import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { Button, Form } from 'react-bootstrap'
import { updateProfile } from '../../actions'
import Header from '../../components/Header'
import defaultProfile from '../../assets/profile.png'
import './profile.css'
class Pure extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: props.email,
      username: props.userName,
      password: props.password,
      password2: props.password,
      avatar: props.avatar,
      error: {},
      tempImg: null
    }
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
      password2,
      tempImg
    } = this.state
    const {
      userId,
      avatar
    } = this.props
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
      this.props.updateProfile({
        email,
        username,
        password,
        password2,
        userId,
        avatar: tempImg || avatar
      })
    }
    this.setState({
      error
    })
  }

  // Convert file to base64 string
fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

  getImage = (event) => {
    this.fileToBase64(event.target.files[0])
    .then(result => {
      this.setState({
        tempImg: result
      })
    });
  }

  render () {
    const {
      email,
      username,
      password,
      password2,
      avatar,
      error,
      tempImg
    } = this.state
    return (
      <>
        <Header goBack={this.props.navigate} />
        <div className='signup-bar'>
          <div className='signup-box'>
          <label htmlFor="file">
            <input type="file"  accept="image/jpeg, image/png"
              onChange={this.getImage} name="image" id="file"
              style={{ display: 'none' }} />
            <img htmlFor="file" className='profile-pic'
                src={tempImg || avatar || defaultProfile}/>
           </label>
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
                Save
            </Button>
            </Form>
          </div>
        </div>
      </>
    )
  }
}

const state = ({ auth }) => ({
  email: auth.email,
  userName: auth.userName,
  avatar: auth.avatar,
  password: auth.password,
  userId: auth.userId
})

const dispatch = (dispatch) => ({
  updateProfile: (payload) => dispatch(updateProfile(payload)),
  navigate: () => dispatch(goBack(-1))
})

Pure.propTypes = {
  navigate: PropTypes.func,
  updateProfile: PropTypes.func,
  email: PropTypes.string,
  userName: PropTypes.string,
  avatar: PropTypes.string,
  password: PropTypes.string,
  userId: PropTypes.string
}

export const UserProfile = connect(state, dispatch)(Pure)
