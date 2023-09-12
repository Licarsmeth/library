const myLibrary = [];

function Book(author, title, page, read) {
  this.author = author;
  this.title = title;
  this.page = page;
  this.read = read;
}

const harry_potter = new Book("JK Rowling", "Harry Potter", 400, true);
const wrath = new Book("John Gwynne", "Wrath", 350, false);

function addBookToLibrary(name) {
  myLibrary.push(name);
}
addBookToLibrary(harry_potter);
addBookToLibrary(wrath);

function addRow(book) {
  // Get a reference to the table body
  const tableBody = document.getElementById("table-body");

  // Create a new table row
  const newRow = document.createElement("tr");

  // Create and add table data cells (td) for each column
  const titleCell = document.createElement("td");
  titleCell.textContent = book.title;
  const authorCell = document.createElement("td");
  authorCell.textContent = book.author;
  const pageCell = document.createElement("td");
  pageCell.textContent = book.page;
  const readCell = document.createElement("td");
  readCell.textContent = book.read ? "👍" : "👎";
  readCell.classList.add("readcell");
  document.body.appendChild(readCell);

  //create delete button
  const delCell = document.createElement("button");
  delCell.classList.add("delCell");
  delCell.textContent = "X";

  // Append the cells to the row
  newRow.appendChild(titleCell);
  newRow.appendChild(authorCell);
  newRow.appendChild(pageCell);
  newRow.appendChild(readCell);
  newRow.appendChild(delCell);

  // Append the row to the table body
  tableBody.appendChild(newRow);

  //toggle read
  readCell.addEventListener("click", (e) => {
    if (e.target.textContent == "👍") {
      e.target.textContent = "👎";
      book.read = "👎";
    } else {
      e.target.textContent = "👍";
      book.read = "👍";
    }
  });

  //remove the element
  delCell.addEventListener("click", (e) => {
    console.log(e.target.parentNode);
    if (confirm("you sure you wanna delete it?")) {
      e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    }
  });
}

addRow(wrath);
addRow(harry_potter);

// Get the modal and button elements
const dialog = document.getElementById("bookModal");
const openModalBtn = document.querySelector("#openModalBtn button");
const closeModalBtn = document.getElementById("closeModalBtn");
const saveBookBtn = document.getElementById("saveBookBtn");

// Event listener to open the modal
openModalBtn.addEventListener("click", () => {
  //reset all values
  bookName.value = "";
  author.value = "";
  page.value = "";
  read.checked = false;
  dialog.showModal();
});

// Event listener to close the modal when clicking the close button
closeModalBtn.addEventListener("click", () => {
  dialog.close();
});

// Event listener to close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

// Event listener to handle saving the book information
saveBookBtn.addEventListener("click", () => {
  const bookName = document.getElementById("bookName").value;
  const author = document.getElementById("author").value;
  const page = document.getElementById("page").value;
  const read = document.getElementById("read").checked;

  // Handle the book name and author as needed
  let tempBookName = bookName.toLowerCase().replace(/ /g, "_");
  tempBookName = new Book(author, bookName, page, read);
  addBookToLibrary(tempBookName);

  //add the added book to the row
  addRow(myLibrary[myLibrary.length - 1]);
  // Close the modal
  dialog.close();
});
