import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from "./BooksAPI";
import BooksList from "./BooksList";
import PropTypes from 'prop-types'

class Search extends Component {
    state = {
        inputSearch: '',
        books_results: [],
        searchUpdated: false     // used to check if the input is updated or not since last call of componentDidUpdate
    };

    handleSearchChange = (event) => {
        const searchValue = event.target.value;
        this.setState(() => ({
            inputSearch: searchValue,
            searchUpdated: true
        }));
    };

    componentDidUpdate() {
        if (this.state.searchUpdated) {
            this.state.inputSearch !== '' ? BooksAPI.search(this.state.inputSearch)
                    .then((books) => {
                        const search_results = "error" in books ? []
                            : books.map((book) => {
                                for (const shelfBook of this.props.shelfBooks) {
                                    if (shelfBook.id === book.id
                                        && shelfBook.title === book.title
                                        && shelfBook.authours === book.authours)
                                        book.shelf = shelfBook.shelf
                                }
                                return book;
                            });
                        this.setState(() => ({
                            books_results: search_results,
                            searchUpdated: false
                        }));
                    })
                : this.setState(() => ({
                    books_results: [],
                    searchUpdated: false
                }));
        }
    }

    BookAddedToShelf = () => {
        this.props.addToShelf();
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                               value={this.state.inputSearch}
                               onChange={this.handleSearchChange}
                        />
                    </div>
                </div>

                <div className="search-books-results">
                    {
                        this.state.books_results &&
                        <BooksList
                            books={this.state.books_results}
                            shelfChange={this.BookAddedToShelf}
                        />
                    }
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    addToShelf: PropTypes.func.isRequired,
    shelfBooks: PropTypes.array.isRequired
}

export default Search