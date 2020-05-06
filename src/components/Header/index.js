import React from 'react'
import Proptypes from 'prop-types'
import {
  FaRegArrowAltCircleLeft
} from 'react-icons/fa';
import './header.css'

const Header = ({ goBack, title }) => {
  return (<div className='top-header'>
      <FaRegArrowAltCircleLeft style={{
        color: '#FFF',
        cursor: 'pointer',
        fontSize: '24px',
        alignSelf: 'center',
        marginLeft: '5px'
      }} onClick={() => goBack()} />
      <div className='header-title'>
        {title && <h3 >{title}</h3>}
      </div>
    </div>
  )
}

Header.propTypes = {
  goBack: Proptypes.func,
  title: Proptypes.string
}

export default Header
