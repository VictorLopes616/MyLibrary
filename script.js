// Array para armazenar os livros
const myLibrary = [];

// Construtor Book
function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

// Protótipo para alternar o status de leitura
Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// Função para exibir uma notificação
function showNotification(message) {
    // Remove qualquer notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Cria nova notificação
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove após 3 segundos
    setTimeout(() => notification.remove(), 3000);
}

// Função para exibir os livros na página
function displayBooks() {
    const libraryDisplay = document.getElementById('library-display');
    libraryDisplay.innerHTML = ''; // Limpa a exibição atual

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id', book.id);

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Autor: ${book.author}</p>
            <p>Páginas: ${book.pages}</p>
            <p>Status: ${book.read ? 'Lido' : 'Não lido'}</p>
            <button class="toggle-read-btn">Alterar Status</button>
            <button class="remove-btn">Remover</button>
        `;

        libraryDisplay.appendChild(bookCard);
    });

    // Adicionar event listeners para os botões de remover e alterar status
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const bookId = e.target.closest('.book-card').getAttribute('data-id');
            removeBook(bookId);
        });
    });

    document.querySelectorAll('.toggle-read-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const bookId = e.target.closest('.book-card').getAttribute('data-id');
            toggleReadStatus(bookId);
        });
    });
}

// Função para adicionar um livro ao array
function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(title, author, pages, read, id);
    myLibrary.push(book);
    displayBooks();
    showNotification('Livro adicionado com sucesso!');
}

// Função para remover um livro
function removeBook(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
        showNotification('Livro removido com sucesso!');
    }
}

// Função para alternar o status de leitura
function toggleReadStatus(bookId) {
    const book = myLibrary.find(book => book.id === bookId);
    if (book) {
        book.toggleRead();
        displayBooks();
        showNotification('Status de leitura alterado!');
    }
}

// Configuração do formulário
const newBookBtn = document.getElementById('new-book-btn');
const bookForm = document.getElementById('book-form');
const cancelBtn = document.getElementById('cancel-btn');

newBookBtn.addEventListener('click', () => {
    bookForm.classList.remove('hidden');
    bookForm.reset(); // Limpa o formulário
});

cancelBtn.addEventListener('click', () => {
    bookForm.classList.add('hidden');
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);
    bookForm.classList.add('hidden');
    bookForm.reset();
});

// Adicionar alguns livros iniciais para teste
addBookToLibrary('O Senhor dos Anéis', 'J.R.R. Tolkien', 1178, true);
addBookToLibrary('1984', 'George Orwell', 328, false);