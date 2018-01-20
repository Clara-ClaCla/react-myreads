import React from 'react'
import Book from './Book'

class Bookshelf extends React.Component {

handleChangeBookshelf(book, newShelf) {
  console.log("handleChangeBookshelf")
  console.log(newShelf)
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


// currentlyReadingBooks: [],
// wantToReadBooks: [],
// readBooks: [],
export default Bookshelf
