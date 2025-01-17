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
        const buttons = document.createElement('div');
        const removeButton = document.createElement('button');
        const readButton = document.createElement('button');

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
        readButton.textContent = (book['isRead'] === 'yes') ? 'Mark Unread' : 'Mark Read';
        removeButton.textContent = 'Remove';
        
        bookElement.appendChild(title);
        bookElement.appendChild(info);
        buttons.appendChild(readButton);
        buttons.appendChild(removeButton);
        bookElement.appendChild(buttons);
        bookContainer.appendChild(bookElement);
    });
}

const newBookButton = document.querySelector('form button');
newBookButton.addEventListener('click', () => {
    const info = document.querySelectorAll('form input');
    const title = info[0].value;
    const author = info[1].value;
    const pages = info[2].value;
    const isRead = info[3].checked ? 'yes' : 'no';
    addBookToLibrary(title,author,pages,isRead);
    displayLibrary();
})

bookContainer.addEventListener('click',(event)=>{
    if (event.target.textContent === 'Remove') {
        myLibrary.splice(parseInt(event.target.parentElement.id),1);
    } else {
        myLibrary[parseInt(event.target.parentElement.id)]['isRead'] = (myLibrary[parseInt(event.target.parentElement.id)]['isRead'] === 'yes') ? 'no':'yes';
    }

    displayLibrary();
})