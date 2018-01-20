import React from 'react'

class Book extends React.Component {
  state = {
    imageWidth: 128,
  }

  handleSelectedOption(event) {
    console.log("handleSelectedOption")
    console.log("event.target.value")
    console.log(event.target.value)
    this.props.onChangeBookshelf(event.target.value)
  }

  render() {
    const { book } = this.props

    //check if the book has an image
    const imageURL = book.imageLinks ? `url(${book.imageLinks.smallThumbnail})` : ""
    const shelf = book.shelf ? book.shelf : "none"

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: this.state.imageWidth,
            height:192,
            backgroundImage:  imageURL }}>
          </div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={(event) => this.handleSelectedOption(event)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default Book
