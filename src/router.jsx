import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ConnectedRouter as Router } from 'connected-react-router'
import { history } from './store'

import Loading from './components/Loading'
import NavBar from './components/NavBar'
import ErrorBar from './components/Error/ErrorBar'
import Authenticate from './components/Authenticate'
import { LoginPage } from './routes/Login'
import { SignUpPage } from './routes/SignUp'
import { HomePage } from './routes/Home'
import { Summary } from './routes/Summary'
import { UserProfile } from './routes/UserProfile'
import { JokeDetails } from './routes/JokeDetails'
import 'bootstrap/dist/css/bootstrap.min.css'

export default () => {
  return (
    <Router history={history}>
      <>
        <Loading />
        <NavBar />
        <ErrorBar />
        <Route path='/' render={() => <Redirect to='/login' />} />
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignUpPage} />
        <Authenticate path='/home' ><HomePage /></Authenticate>
        <Authenticate path='/summary' ><Summary /></Authenticate>
        <Authenticate path='/userprofile' ><UserProfile /></Authenticate>
        <Authenticate path='/joke/:id' ><JokeDetails /></Authenticate>
      </>
    </Router>
  )
}
