import React from 'react'
import Proptypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const Authenticate = ({ children, isSigned, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
      isSigned ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
      />
  )
}

Authenticate.propTypes = {
  isSigned: Proptypes.bool,
  children: Proptypes.object
}

const state = ({ auth }) => ({
  isSigned: auth.isSigned
})

export default connect(state)(Authenticate)

