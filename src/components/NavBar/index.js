import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  Nav, Navbar, NavDropdown
} from 'react-bootstrap'
import {
  FaRegWindowClose,
  FaRegWindowMaximize,
  FaRegWindowMinimize,
  FaRegWindowRestore
} from 'react-icons/fa'
import { userLogout } from '../../actions'
import defaultProfile from '../../assets/profile.png'
import './navbar.css'

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.win = window.remote
  }
  state={ isMaximize: false }
  close = () => {
    this.win && this.win.getCurrentWindow().close()
  }
  quit = () => {
    this.win && this.win.app.quit()
  }
  toggleScreen = () => {
    this.win &&
      this.win.getCurrentWindow().setFullScreen(
        !this.win.getCurrentWindow().isFullScreen()
      );
  }
  toggleDevTools = () => {
    this.win &&
      this.win.getCurrentWindow().webContents.toggleDevTools()
  }
  reload = () => {
    this.win &&
      this.win.getCurrentWindow().reload()
  }
  minimize = () => {
    this.win &&
      this.win.getCurrentWindow().minimize()
  }
  toggleMaximize = () => {
    const window = this.win && this.win.getCurrentWindow()
    if (window) {
      if (!window.isMaximized()) {
        window.maximize()
        this.setState({
          isMaximize: true
        })
      } else {
        this.setState({
          isMaximize: false
        })
        window.unmaximize();
      }
    }
  }
  signOut = () => {
    this.props.userLogout()
  }
  userProfie = () => {
    this.props.navigateToProfile()
  }
  render () {
    const { navigate,
       isSigned,
      avatar } = this.props
    const { isMaximize } = this.state
    return (
      <Navbar expand="sm" variant="dark">
        <Nav className="mr-auto">
          <NavDropdown className='dropdown-custom'
            title="File" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={this.close}>
              Close(Ctrl+W)</NavDropdown.Item>
            <NavDropdown.Item onClick={this.quit}>
              Exit(Alt+F4)</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown className='dropdown-custom'
            title="View" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={this.reload}>
              Reload(Ctrl+R)
              </NavDropdown.Item>
            <NavDropdown.Item onClick={this.toggleScreen}>
              Toggle Full Screen(F11)
              </NavDropdown.Item>
            <NavDropdown.Item onClick={this.toggleDevTools}>
              Toggle Developer Tools(Alt+Ctrl+I)
              </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown className='dropdown-custom'
            title="Window" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={this.minimize}>
              Minimize(Ctrl+M)
              </NavDropdown.Item>
          </NavDropdown>
          {!isSigned && <Nav.Link onClick={() => navigate()}>Sign-Up</Nav.Link>}
        </Nav>
        <Nav>
        {isSigned && <NavDropdown className='dropdown-custom'
            alignRight
            title={<img className='avatar' src={avatar || defaultProfile}/>}
             id="basic-nav-dropdown" >
              <NavDropdown.Item onClick={this.userProfie}>
                User Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.signOut}>
                SignOut
              </NavDropdown.Item>
        </NavDropdown> }
          <Nav.Link
            onClick={this.minimize}>
            <FaRegWindowMinimize /></Nav.Link>
          <Nav.Link
            onClick={this.toggleMaximize}>
              {isMaximize ? <FaRegWindowRestore />
              : <FaRegWindowMaximize />}</Nav.Link>
          <Nav.Link className='icon-red'
          onClick={this.quit}><FaRegWindowClose /></Nav.Link>
        </Nav>
      </Navbar>
    )
  }
}

const state = ({ auth }) => ({
  avatar: auth.avatar,
  isSigned: auth.isSigned
})

const dispatch = (dispatch) => ({
  navigate: () => dispatch(push('/signup')),
  navigateToProfile: () => dispatch(push('/userprofile')),
  userLogout: (payload) => dispatch(userLogout(payload))
})

NavBar.propTypes = {
  avatar: PropTypes.string,
  isSigned: PropTypes.bool,
  navigate: PropTypes.func,
  navigateToProfile: PropTypes.func,
  userLogout: PropTypes.func
}

export default connect(state, dispatch)(NavBar)
