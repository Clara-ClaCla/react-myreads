import React from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     currentlyReadingBooks: [],
     wantToReadBooks: [],
     readBooks: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({
        currentlyReadingBooks: books.filter((b) => b.shelf === "currentlyReading"),
        wantToReadBooks: books.filter((b) => b.shelf === "wantToRead"),
        readBooks: books.filter((b) => b.shelf === "read")
      })
    })
  }

  updateBook(book, newShelf) {
    console.log("updateBook")
    BooksAPI.update(book, newShelf).then(results => {
      console.log(results)
      const oldBookList = book.shelf + "Books"
      const newBookList = newShelf + "Books"
      var updatedBook = book
      book.shelf = newShelf
      console.log(oldBookList);
      this.setState(state => ({
        //remove
        [oldBookList]: state[oldBookList].filter((b) => b.id !== book.id),
        // add
        [newBookList]: state[newBookList].concat(book)
      }))
    })
  }


  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
            onChangeBookshelf={(book, newShelf) => this.updateBook(book, newShelf)}
          />
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
