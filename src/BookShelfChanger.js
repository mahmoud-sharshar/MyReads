import React from 'react'
import PropTypes from 'prop-types'

const BookShelfChanger = (props) => {
    return (
        <select defaultValue={props.bookShelf} onChange={(event) => {
            props.changeBookShelf(event.target.value)
        }}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    )
}

BookShelfChanger.propTypes = {
    bookShelf: PropTypes.string.isRequired,
    changeBookShelf: PropTypes.func.isRequired
}

export default BookShelfChanger