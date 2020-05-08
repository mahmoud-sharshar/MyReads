import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from "./Search";
import BooksList from "./BooksList";
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';

class BooksApp extends React.Component {
    state = {
        books: []
    }

    getShelfBooks = (shelfName) => {
        const books = this.state.books.filter((book) => {
            return book.shelf === shelfName
        });
        return books;
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books: books
                }))
            });
    }

    BookShelfChanged = () => {
        this.componentDidMount();
    };

    render() {
        return (
            <div className="app">

                <Route exact path='/search' render={() =>
                    <Search addToShelf={this.BookShelfChanged}/>
                }/>

                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <header className="list-books-title">
                            <h1>MyReads</h1>
                        </header>

                        <main className="list-books-content">
                            <section className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                <BooksList
                                    books={this.getShelfBooks("currentlyReading")}
                                    shelfChange={this.BookShelfChanged}
                                />
                            </section>

                            <section className="bookshelf">
                                <h2 className="bookshelf-title">Want to Read</h2>
                                <BooksList
                                    books={this.getShelfBooks("wantToRead")}
                                    shelfChange={this.BookShelfChanged}
                                />
                            </section>

                            <section className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <BooksList
                                    books={this.getShelfBooks("read")}
                                    shelfChange={this.BookShelfChanged}
                                />
                            </section>
                        </main>

                        <Link to='/search' className="open-search">
                            Add a book
                        </Link>

                    </div>
                )}/>

            </div>
        )
    }
}

export default BooksApp