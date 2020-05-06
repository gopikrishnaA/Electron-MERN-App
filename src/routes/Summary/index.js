import React, { Component } from 'react'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import { push } from 'react-router-redux'
import {
  Button, Dropdown, OverlayTrigger, Tooltip, Table
} from 'react-bootstrap'
import {
  FaTrashAlt,
  FaSortDown,
  FaSortUp
} from 'react-icons/fa';
import Proptypes from 'prop-types'
import {
  deleteComment,
  deleteJoke,
  deleteSelectedJoke,
  getJokes,
  getComments,
  updateData,
  updateComment
} from '../../actions'
import CustomModal from '../../components/Modals/Modal'
import Header from '../../components/Header'
import 'react-confirm-alert/src/react-confirm-alert.css'
import './summary.css'
import { getItems } from './selectedItemsFilter'

class Pure extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.onSortTimeStamp = this.onSortTimeStamp.bind(this)
    this.selectHandler = this.selectHandler.bind(this)
    this.selectAllHandler = this.selectAllHandler.bind(this)
    this.onDeleteHandler = this.onDeleteHandler.bind(this)
  }

  componentDidMount () {
    this.props.getJokes()
  }

  handleChange (eventKey, event) {
    const value = event.target.text
    console.info('Vlaue', value)
    this.props.onUpdateState({ selectedvalue: value })
  }

  onSortTimeStamp () {
    const { isSort, onUpdateState } = this.props
    onUpdateState({ isSort: !isSort })
  }

  onDeleteHandler (items) {
    const updatedItems = items
      .filter((item) => item.checked)
      .reduce((acc, item) => {
        acc.push(item.id)
        return acc
      }, [])
    this.props.deleteSelectedJoke(updatedItems)
  }

  deleteJoke (data) {
    const isString = typeof data === 'string'
    confirmAlert({
      title: 'Cofirm',
      message: isString ? 'Are you sure to delete.' :
        'Are you sure to delete all data.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => (isString ? this.props.deleteJoke(data)
            : this.onDeleteHandler(data))
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    })
  }
  selectAllHandler () {
    const { items } = this.props
    const updatedItems = items.map((item) => ({
      ...item,
      checked: true
    }))
    updatedItems.length > 0 && this.deleteJoke(updatedItems)
  }

  selectHandler (event, id) {
    console.info(event.target.checked, id)
    const {
      target: { checked }
    } = event
    const { items, onUpdateState } = this.props
    const updatedItems = items.map((item) => {
      const value = item.id === id ? checked : item.checked
      return { ...item, checked: value }
    })
    onUpdateState({ items: updatedItems })

    const updatedItemsLength =
      updatedItems.filter((item) => item.checked).length
    const isChecked = updatedItemsLength === items.length
    this.setState({
      isChecked,
      isDeleteDisabled: updatedItemsLength === 0
    })
  }
  handleClose = () => {
    this.props.onUpdateState({
      isShow: false,
      selectedId: -1
    })
  }
  handleOpen = (selectedId) => {
    this.props.getComments({
      isShow: true,
      selectedId
    })
  }
  handleInput = (event) => {
    this.props.onUpdateState({
      commentText: event.target.value
    })
  }

  render () {
    const {
      comments,
      commentText,
      items,
      isShow,
      isSort,
      deleteComment,
      selectedId,
      navigateToHome,
      updateComment,
      selectedvalue
    } = this.props
    if (items.length === 0 && selectedvalue === 'All') {
      return (
        <div>
          <Header goBack={navigateToHome} />
          <h6 className='header'>
            No Summary data to display go back to home and do actions on jokes
          </h6>
          <div className='buttonDiv'>
            <Button className='deleteBtn' onClick={() => navigateToHome()}>
              Home
            </Button>
          </div>
        </div>
      )
    }
    return (
      <>
        <CustomModal
          show={isShow}
          handleClose={this.handleClose}
          handleSave={() => updateComment({ selectedId, commentText })}
          handleModalOnChange={this.handleInput}
          commentText={commentText}
          comments={comments}
          deleteComment={deleteComment}
        />
        <div style={{ overflowY: 'auto' }}>
        <Header goBack={navigateToHome}
          title='Summary' />
        <Table
          className='summery-table'
          striped
          bordered
          hover
          size="sm"
        >
          <thead>
            <tr>
              <th className='th1'>S.no</th>
              <th className='th2'>Joke</th>
              <th className='th3'>
                <Dropdown onSelect={this.handleChange}>
                  <Dropdown.Toggle
                    id="dropdown-basic-button"
                    size="sm"
                    variant="outline-light">
                    {selectedvalue || 'Filter By'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {['Like', 'Unlike', 'All'].map(item =>
                      <Dropdown.Item key={item
                      }>{item}</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </th>
              <th className='th4' onClick={this.onSortTimeStamp}>
                <div className='time-td'>
                  <div>Time</div>
                {isSort ? <FaSortUp style={{ fontSize: '12px' }} />
                  : <FaSortDown style={{ fontSize: '12px' }} />}
                </div>
              </th>
              <th className='th5'>
                <Button
                  size='sm'
                  variant="danger"
                  onClick={this.selectAllHandler}>
                  Delete All
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              return (
                <tr data-qa={`tr${item.id}`} key={item.id}>
                  <td>{i + 1}</td>
                  <td onClick={() => this.handleOpen(item.id)}>
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Tooltip id='tooltip-top'>
                          See comments on clicking here ...
                        </Tooltip>
                      }
                    >
                      <span className='joke_text'>{item.joke}</span>
                    </OverlayTrigger>
                  </td>
                  <td className='status'>{item.status}</td>
                  <td>{item.createDate}</td>
                  <td>
                    <FaTrashAlt
                      className='del_img'
                      onClick={() => this.deleteJoke(item.id)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ jokes }) => ({
  commentText: jokes.commentText,
  items: getItems(jokes),
  isShow: jokes.isShow,
  isSort: jokes.isSort,
  comments: jokes.comments,
  selectedId: jokes.selectedId,
  selectedvalue: jokes.selectedvalue
})

const mapDispatchToProps = (dispatch) => ({
  deleteComment: (payload) => dispatch(deleteComment(payload)),
  deleteJoke: (payload) => dispatch(deleteJoke(payload)),
  deleteSelectedJoke: (payload) => dispatch(deleteSelectedJoke(payload)),
  getComments: (payload) => dispatch(getComments(payload)),
  getJokes: () => dispatch(getJokes()),
  navigateToHome: () => dispatch(push('/home')),
  onUpdateState: (payload) => dispatch(updateData(payload)),
  updateComment: (payload) => dispatch(updateComment(payload))
})

Pure.propTypes = {
  isShow: Proptypes.bool,
  isSort: Proptypes.bool,
  comments: Proptypes.array,
  commentText: Proptypes.string,
  selectedId: Proptypes.number,
  deleteComment: Proptypes.func,
  deleteJoke: Proptypes.func,
  deleteSelectedJoke: Proptypes.func,
  getComments: Proptypes.func,
  getJokes: Proptypes.func,
  goBack: Proptypes.func,
  items: Proptypes.array,
  navigateToHome: Proptypes.func,
  onUpdateState: Proptypes.func,
  selectedvalue: Proptypes.string,
  updateComment: Proptypes.func
}

export const Summary = connect(mapStateToProps, mapDispatchToProps)(Pure)
