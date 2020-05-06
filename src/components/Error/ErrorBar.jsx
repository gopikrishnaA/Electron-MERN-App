import React from 'react'
import Proptypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { updateError } from '../../actions'
import './errorBar.css'

class AlertDismissable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  static getDerivedStateFromProps (props) {
    props.showError &&
    setTimeout(() => props.updateError({
      showError: false,
      errorMessage: ''
    }), 5000)
    return null
  }
  hideError = () => {
    this.props.updateError({
      showError: false,
      errorMessage: ''
    })
  }
  render () {
    const { showError, errorMessage, variant } = this.props
    if (!showError) {
      return null
    }
    return (
      <Alert className='alert-error'
        variant={variant}
        onClose={() => this.hideError()} dismissible>
        <p>
          {errorMessage}
        </p>
      </Alert>
    );
  }
}

const state = ({ error }) => ({
  showError: error.showError,
  errorMessage: error.errorMessage,
  variant: error.variant
})

const dispatch = (dispatch) => ({
  updateError: (payload) => dispatch(updateError(payload))
})
AlertDismissable.propTypes = {
  showError: Proptypes.bool,
  errorMessage: Proptypes.string,
  variant: Proptypes.string,
  updateError: Proptypes.func
}
export default connect(state, dispatch)(AlertDismissable)
