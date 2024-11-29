const myLibrary = [];

function Book (title,author,pages,isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${isRead? 'read':'not read yet'}`
    };
}

function addBookToLibrary(title,author,pages,isRead) {
    const newBook = new Book(title,author,pages,isRead);
    myLibrary.push(newBook);
}

function displayLibrary() {
    const bookContainer = document.querySelector('.bookContainer');
    let child = bookContainer.lastElementChild;
    while (child) {
        bookContainer.removeChild(child);
        child = bookContainer.lastElementChild;
    }
    myLibrary.forEach((book) => {
        const bookElement = document.createElement('div');
        const title = document.createElement('h1');
        const info = document.createElement('ul');

        bookElement.classList.add('book');
        title.textContent = book.title;
        for (const detail in book) {
            if (detail != 'title' && detail != 'info') {
                const detailElement = document.createElement('li');
                detailElement.textContent = `${detail}: ${book[detail]}`;
                info.appendChild(detailElement);
            }
        }
        bookElement.appendChild(title);
        bookElement.appendChild(info);
        bookContainer.appendChild(bookElement);
    });
}

const newBookButton = document.querySelector('form button');
newBookButton.addEventListener('click', () => {
    const info = document.querySelectorAll('form input');
    const title = info[0].value;
    const author = info[1].value;
    const pages = info[2].value;
    const isRead = info[3].checked;
    addBookToLibrary(title,author,pages,isRead);
    displayLibrary();
})