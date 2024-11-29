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

const bookContainer = document.querySelector('.bookContainer');

function displayLibrary() {
    let child = bookContainer.lastElementChild;
    while (child) {
        bookContainer.removeChild(child);
        child = bookContainer.lastElementChild;
    }
    myLibrary.forEach((book,index) => {
        const bookElement = document.createElement('div');
        const title = document.createElement('h1');
        const info = document.createElement('ul');
        const removeButton = document.createElement('button');

        bookElement.classList.add('book');
        bookElement.id = index;
        title.textContent = book.title;
        for (const detail in book) {
            if (detail != 'title' && detail != 'info') {
                const detailElement = document.createElement('li');
                detailElement.textContent = `${detail}: ${book[detail]}`;
                info.appendChild(detailElement);
            }
        }
        removeButton.textContent = 'remove';
        
        bookElement.appendChild(title);
        bookElement.appendChild(info);
        bookElement.appendChild(removeButton);
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

bookContainer.addEventListener('click',(event)=>{
    myLibrary.splice(parseInt(event.target.id),1);
    displayLibrary();
})