import React from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'

class SearchBooks extends React.Component {
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
