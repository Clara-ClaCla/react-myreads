import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import './App.css'


class BooksApp extends React.Component {
  state = {
     currentlyReadingBooks: [],
     wantToReadBooks: [],
     readBooks: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReadingBooks: books.filter((b) => b.shelf === "currentlyReading"),
        wantToReadBooks: books.filter((b) => b.shelf === "wantToRead"),
        readBooks: books.filter((b) => b.shelf === "read")
      })
    })
  }

  updateBook(book, newShelf) {
    BooksAPI.update(book, newShelf).then(results => {

      if (newShelf === "none") {
        this.deleteBookFromList(book, newShelf)
      } else if (!book.shelf) {
        this.addBookToList(book, newShelf)
      }else {
        this.moveBook(book, newShelf)
      }
    })
  }

  moveBook(book, newShelf) {
    const oldBookList = book.shelf + "Books"
    const newBookList = newShelf + "Books"
    var updatedBook = book
    book.shelf = newShelf
    this.setState(state => ({
      //remove
      [oldBookList]: state[oldBookList].filter((b) => b.id !== book.id),
      // add
      [newBookList]: state[newBookList].concat(updatedBook)
    }))
  }

  deleteBookFromList(book, newShelf) {
    const oldBookList = book.shelf + "Books"
    this.setState(state => ({
      //remove
      [oldBookList]: state[oldBookList].filter((b) => b.id !== book.id),
    }))
  }

  addBookToList(book, newShelf) {
    const newBookList = newShelf + "Books"
    var updatedBook = book
    book.shelf = newShelf
    this.setState(state => ({
      // add
      [newBookList]: state[newBookList].concat(updatedBook)
    }))
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={ () => (
          <SearchBooks
            bookshelfLists={[this.state.currentlyReadingBooks,
             this.state.wantToReadBooks,
             this.state.readBooks]}
            onChangeBookshelf={(book, newShelf) => this.updateBook(book, newShelf)}
            />
          )}
        />
        <Route exact path="/" render={() => (

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  title="Currently Reading"
                  books={this.state.currentlyReadingBooks}
                  onChangeBookshelf={(book,newShelf) => this.updateBook(book, newShelf)}/>
                <Bookshelf
                  title="Want to Read"
                  books={this.state.wantToReadBooks}
                  onChangeBookshelf={(book,newShelf) => this.updateBook(book, newShelf)}/>
                <Bookshelf
                  title="Read"
                  books={this.state.readBooks}
                  onChangeBookshelf={(book,newShelf) => this.updateBook(book, newShelf)}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
