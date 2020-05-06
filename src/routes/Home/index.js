import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button } from 'react-bootstrap'
import { updateJoke, getJoke } from '../../actions'
import './home.css'

class Pure extends Component {
  render () {
    const { id, joke,
     statusUpdate = () => {},
     getJoke,
     navigate } = this.props
    return (
      <div className='App'>
        <div className='App-header'>
          <p className='App-title'>{joke}</p>
          <div className='App-button'>
            <Button
              data-qa='like'
              onClick={() => statusUpdate({ id, joke, status: 'Like' })}
            >
              Like
            </Button>
            <Button
              data-qa='unlike'
              onClick={() => statusUpdate({ id, joke, status: 'Unlike' })}
            >
              Unlike
            </Button>
            <Button data-qa='summary' onClick={() => navigate()}>
              Summary
            </Button>
            <Button
              data-qa='refresh'
              onClick={() => getJoke()}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const state = ({ jokes }) => ({
  joke: jokes.item.joke,
  id: jokes.item.id
})

const dispatch = (dispatch) => ({
  getJoke: () => dispatch(getJoke()),
  statusUpdate: ({ id, joke, status }) =>
    dispatch(updateJoke({ id, joke, status })),
  navigate: () => dispatch(push('/summary'))
})

Pure.propTypes = {
  joke: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  getJoke: PropTypes.func,
  statusUpdate: PropTypes.func,
  navigate: PropTypes.func
}

export const HomePage = connect(state, dispatch)(Pure)
