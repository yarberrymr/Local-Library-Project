function findAccountById(accounts, id) {
  //search through accounts array until account.id = id and return the account object
  return accounts.find((account)=> account.id === id); 
}

function sortAccountsByLastName(accounts) {
  /*take accounts array and check with ternary operator if one account should be sorted before the other with .sort method
    and return the newly sorted array*/
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  //filter through books array to find if any (using.some) borrows have the given account id and return the length of the filtered array
const accountBorrows = books.filter(({borrows}) => {
  return borrows.some(({id}) => {
    return id === account.id;
  })
})
return accountBorrows.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  /*filter through books; destructure books to just borrows; find any (using .some) books with
    matching account id and returned = false*/
  let borrowedByAccount = books.filter(({borrows}) => {
    return borrows.some(({id, returned}) => {
      return id === account.id && returned === false;
    })
  })
  //update new array of borrowed books with more author info from authors data
  for (let book of borrowedByAccount) {
   book.author = authors.find(({id}) => id === book.authorId);
  }
  return borrowedByAccount;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
