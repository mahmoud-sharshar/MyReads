import React from 'react'
import Book from "./Book";
import PropTypes from 'prop-types'

const BooksList = props => {
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    props.books.map((book, index) =>
                        <Book
                            book={book}
                            shelfChange={props.shelfChange}
                        />
                    )
                }
            </ol>
        </div>
    )
};

BooksList.propTypes = {
    books: PropTypes.array.isRequired
}
export default BooksList