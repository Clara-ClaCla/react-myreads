import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Bookshelf extends React.Component {
  static PropTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.object.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired
  }

  handleChangeBookshelf(book, newShelf) {
    if (this.props.onChangeBookshelf) {
      this.props.onChangeBookshelf(book, newShelf)
    }
  }

  render() {
    const { title, books } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map( (book, index) => (
              <li key={index}>
                <Book book={book} onChangeBookshelf={(newShelf) =>
                  this.handleChangeBookshelf(book, newShelf)} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default Bookshelf
