function findAuthorById(authors, id) {
  //search through authors array to find an author object that has a matching id
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  ////search through books array to find a book object that has a matching id
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  /*filter books array twice: once to find books with borrowed status false, 
  and once to find books with borrowed status true. Then put those arrays into new empty array*/
  const returnedBooks = books.filter(({borrows}) => borrows[0].returned === true);
  const borrowedBooks = books.filter(({borrows}) => borrows[0].returned === false);
  return booksPartition = [borrowedBooks, returnedBooks];
  }

function getBorrowersForBook(book, accounts) {
  //search through books array to find accounts that have matching id to borrows id with .map
  let borrowers=[];
  book.borrows.map(borrow => {
    let accountFinder = accounts.find(({id}) => id === borrow.id);
    const returned = borrow.returned;
    //spread previous .find result into new object with returned key value pair included
    accountFinder = {...accountFinder, returned};
    //push new object to borrowers array for each book.
    borrowers.push(accountFinder);
  });
  //slice the new array to 10 results
return borrowers.slice (0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
