import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { updateJoke } from '../../actions'
import '../Home/home.css'

class Pure extends Component {
  render () {
    const { id, joke, navigate, like } = this.props
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 data-qa='header' className='App-title'>
            {joke}
          </h1>
          <div className='App-button'>
            <Button onClick={() => like({ id, joke, status: 'Like' })}>
              Like
            </Button>
            <Button onClick={() => like({ id, joke, status: 'Unlike' })}>
              Unlike
            </Button>
            <Button onClick={() => navigate()}>Summary</Button>
          </div>
        </header>
      </div>
    )
  }
}

const state = ({ jokes }) => ({
  joke: jokes.joke,
  id: jokes.id
})

const dispatch = (dispatch) => ({
  like: ({ id, joke, status }) =>
    dispatch(updateJoke({ id, joke, status, route: 'login' })),
  navigate: () => dispatch(push('/summary'))
})

Pure.propTypes = {
  joke: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  like: PropTypes.func,
  navigate: PropTypes.func
}
export const JokeDetails = connect(state, dispatch)(Pure)
