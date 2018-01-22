import React from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBooks extends React.Component {
  static PropTypes = {
    bookLists: PropTypes.array.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired
  }

  state = {
    queryBooks: [],
    title: ""
  }

  handleChangeBookshelf(book, newShelf) {
    if (this.props.onChangeBookshelf) {
      this.props.onChangeBookshelf(book, newShelf)
    }
  }

  updateQuery(query) {
    if (query === "") {
      this.resetResult()
    } else {
      BooksAPI.search(query).then((books) => {
        if (!books.error) {
          this.checkBookshelf(books)
          this.setState({
            queryBooks: books,
            title: "Results"
          })
        } else {
          this.resetResult()
        }
      })
    }
  }

  checkBookshelf(searchBooks) {
    //get all the ids from the search results
    const searchBooksID = searchBooks.map((b) => b.id)

    this.props.bookshelfLists.map((bookshelfList) => (
      bookshelfList.map((book) => {
        //if book is already on the Bookshelf
        //the book from the search results will have the corresponding shelf action
        if (searchBooksID.includes(book.id)) {
          const sBook = searchBooks.find((b) => b.id === book.id)
          sBook.shelf = book.shelf
        }
      })
    ))
  }

  resetResult() {
    this.setState({
      queryBooks: [],
      title: ""
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or authors. So, don't worry if
              you don't find a specific authors or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
         <Bookshelf title={this.state.title} books={this.state.queryBooks} onChangeBookshelf={(book, newShelf) =>
           this.handleChangeBookshelf(book, newShelf)}
         />
        </div>
      </div>
    )
  }
}

export default SearchBooks
