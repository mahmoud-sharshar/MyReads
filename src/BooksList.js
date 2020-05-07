import React from 'react'
import Book from "./Book";
const BooksList = props => {
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    props.books.map((book,index) =>
                        <Book book={book} key={index}/>
                    )
                }
            </ol>
        </div>
    )
};

export default BooksList