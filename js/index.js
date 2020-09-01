document.addEventListener("DOMContentLoaded", function() {
    appendBooksToListPanel()
});

const myself = {"id":1, "username":"pouros"}
const listPanelUl = document.querySelector("#list")
const showPanel = document.querySelector("#show-panel")

const appendBooksToListPanel = () => {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then((books) => {
        books.forEach(book => {
        createBooksLi(book)})
    })
}

const createBooksLi = (singleBook) => {
    const bookLi = document.createElement('li')
    bookLi.innerText = singleBook.title
    bookLi.dataset.bookId = singleBook.id

    bookLi.addEventListener('click', (e) => {
        const bookId = e.target.dataset.bookId
        showBook(bookId)
    })

    listPanelUl.append(bookLi)  
}

const showBook = (id) => {
    fetch(`http://localhost:3000/books/${id}`)
    .then(res => res.json())
    .then((book) => {
        appendBookToShowPanel(book)
    })
}

const appendBookToShowPanel = (singleBook) => {
    while (showPanel.firstChild) showPanel.removeChild(showPanel.firstChild)

    const bookDiv = document.createElement('div')
    bookDiv.dataset.bookId = singleBook.id

    const bookImg = document.createElement('img')
    bookImg.src = singleBook.img_url
    
    const bookTitle = document.createElement('p')
    bookTitle.innerText = singleBook.title
    bookTitle.style.fontWeight = "bold"

    const subtitle = document.createElement('p')
    subtitle.innerText = singleBook.subtitle
    subtitle.style.fontWeight = "bold"

    const author = document.createElement('p')
    author.innerText = singleBook.author
    author.style.fontWeight = "bold"

    const description = document.createElement('p')
    description.innerText = singleBook.description
    
    const userLikesDiv = document.createElement('div')
    const userLikesUl = document.createElement('ul')
    userLikesDiv.append(userLikesUl)

    singleBook.users.forEach(user => {
        const userBookLikeLi = document.createElement('li')
        
        userBookLikeLi.innerText = user.username
        userLikesUl.append(userBookLikeLi)
    })

        const likeButton = document.createElement('button')
            for (const user of singleBook.users) {
                if (user.id == 1 ) {
                    likeButton.innerText = "UNLIKE"
                } else { 
                    likeButton.innerText = "LIKE"
                }
            }

        likeButton.addEventListener('click', (e) => {
        
        const bookId = e.target.parentElement.dataset.bookId

        if (likeButton.innerText === "LIKE") {
            likeButton.innerText = "UNLIKE"
            bookLikes(bookId)
        } else if (likeButton.innerText === "UNLIKE") {
            likeButton.innerText = "LIKE"
            bookUnlikes(bookId)
        }          
    })

    bookDiv.append(bookImg, bookTitle, subtitle, author, description, userLikesDiv,likeButton)
    showPanel.append(bookDiv)
}

const bookLikes = (id) => {

    fetch(`http://localhost:3000/books/${id}`)
    .then(res => res.json())
    .then((book) => {
        let users;
        users = book.users
       users.push(myself)
       updateBookLikes(users, id)
    })
}

const bookUnlikes = (id) => {

    fetch(`http://localhost:3000/books/${id}`)
    .then(res => res.json())
    .then((book) => {
        let users;
       users = book.users.filter(user => {
           return user.id !== myself.id
       })
       updateBookLikes(users, id)
    })
}

const updateBookLikes = (userArray, id) => {
    const usersBookLikes = {
        "users": userArray
      }

    fetch(`http://localhost:3000/books/${id}`, {method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify(usersBookLikes)
    })
    .then(res => res.json())
    .then(appendBookToShowPanel)
}
