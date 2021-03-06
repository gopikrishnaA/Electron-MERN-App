import React from 'react'
import Proptypes from 'prop-types'
import { Alert, Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { FaTrashAlt } from 'react-icons/fa'
import './modal.css'

const CustomModal = (props) => {
  const {
    comments = [],
    commentText = '',
    deleteComment = () => {},
    handleClose = () => {},
    handleSave = () => {},
    handleModalOnChange,
    show,
  } = props

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className='mb-3'>
            <FormControl
              required
              as='textarea'
              placeholder='add comments...'
              onChange={handleModalOnChange}
              value={commentText}
              isValid={commentText.trim().length > 2}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={commentText.trim().length < 3}
            variant='primary'
            onClick={handleSave}
          >
            Save
          </Button>
        </Modal.Footer>
        <div className='comment_section'>
          {comments.map((item, id) => (
            <Alert key={`${item.id}-${id}`} variant='info' className='alert'>
              <div>{item.comment}</div>
              <FaTrashAlt
                className='del_icon'
                onClick={() => deleteComment(item)}
              />
            </Alert>
          ))}
        </div>
      </Modal>
    </>
  )
}

CustomModal.propTypes = {
  comments: Proptypes.array,
  commentText: Proptypes.string,
  deleteComment: Proptypes.func,
  handleClose: Proptypes.func,
  handleSave: Proptypes.func,
  handleModalOnChange: Proptypes.func,
  show: Proptypes.bool
}

export default CustomModal
