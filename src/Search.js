import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from "./BooksAPI";
import BooksList from "./BooksList";
class Search extends Component{
    state = {
        inputSearch: '',
        books_results: []
    };
    handleSearchChange = (event)=>{
        this.setState({
            inputSearch: event.target.value
        });
    };

    searchForBooks = () => {
        this.state.inputSearch !== '' && BooksAPI.search(this.state.inputSearch)
            .then((books) => {
                this.setState(() => ({
                    books_results: books
                }))
            });
    };
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                               value={this.state.inputSearch}
                               onChange={this.handleSearchChange}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.books_results && <BooksList books={this.state.books_results}/>}
                </div>
            </div>
        )
    }
}

export default Search