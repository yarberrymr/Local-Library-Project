const common = require("mocha/lib/interfaces/common");

function getTotalBooksCount(books) {
  //read the length of the books array and return the value
  return books.length; 
}

function getTotalAccountsCount(accounts) {
  //read the length of the accounts array and return the value
  return accounts.length; 
}

function getBooksBorrowedCount(books) {
  //filter books array by borrowed status = false
  let result = books.filter(({borrows}) => borrows[0].returned === false);
  //read the length of the resulting array and return the value
  return result.length;
}

//helper function to sort and slice the new array to given length
function _objectSortAndSlice(unsortedArray, length) {
  //take an array argument and sort it by the count value
  let sortedArray = unsortedArray.sort((objectA, objectB) => objectB.count - objectA.count);
  //slice the array to the given length and return the newly sliced array
  return sortedArray.slice(0,length);
}

function getMostCommonGenres(books) {
  //reduce the books array to just an array of genres
  let genreList = books.reduce((acc, {genre}) => {
    acc.push(genre);
    return acc;
  }, []);
/*reduce the array again by adding the array values 
as keys with a value of how many time that genre appears*/
  let counted = genreList.reduce((acc, genre) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1
    }
    return acc;
  }, {}) 
  //create new key value pairs in an empty array to show genre counts
  let commonGenres = []
  for (let property in counted) {
    const name = property;
    const count = counted[property];
   commonGenres.push({name, count});
  }
  //helper function to sort and slice
  return _objectSortAndSlice(commonGenres, 5);
}

function getMostPopularBooks(books) {
  //create array and push key value pairs of book names and the amout of times borowed
  let mostPopular = [];
  for (let book of books) {
    const name = book.title;
    const count = book.borrows.length;
    let newBook = {name, count};
    mostPopular.push(newBook);
  }
  //helper function to sort by count and slice to length of 5
  return _objectSortAndSlice(mostPopular, 5);
}

function getMostPopularAuthors(books, authors) {
  /* create empty array and push key value pairs equal to author's name
    and amount of times their books were borrowed
    author's name input using template literal to format properly*/
  const popularAuthor = [];
  authors.forEach ((author) => {
    let authorBooks = books.filter((book) => book.authorId === author.id);
    let totalBorrows = authorBooks.reduce((total, book) => {
      total += book.borrows.length;
      return total;
    }, 0)
    popularAuthor.push({name: `${author.name.first} ${author.name.last}`, count: totalBorrows})
  })
  
  //helper function to srt by count and slice to length of 5
  return _objectSortAndSlice(popularAuthor, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
