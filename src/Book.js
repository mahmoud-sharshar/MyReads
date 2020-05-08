import React, {Component} from 'react'
import BookShelfChanger from "./BookShelfChanger";
import * as BooksAPI from './BooksAPI'

class Book extends Component {
    changeBookShelf = (newShelf) => {
        BooksAPI.update(this.props.book, newShelf)
            .then((res) => {
                this.props.shelfChange();
            });
    };

    render() {
        return (
            <li key={this.props.book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={{
                                 width: 128, height: 193, backgroundImage: `url(
                                 ${this.props.book.imageLinks && this.props.book.imageLinks.smallThumbnail}
                                 )`
                             }
                             }>
                        </div>
                        <div className="book-shelf-changer">
                            <BookShelfChanger
                                bookShelf={"shelf" in this.props.book ? this.props.book.shelf : "none"}
                                changeBookShelf={this.changeBookShelf}
                            />
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.authors}</div>
                </div>
            </li>
        )
    }

}

export default Book