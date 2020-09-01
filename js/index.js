document.addEventListener("DOMContentLoaded", function() {
let likeUnliked = null
getBooks()
});


//get books
//render books
const getBooks = () => {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(books =>{
        document.querySelector('#list').innerHTML = ""
        books.forEach((book) => {
            renderBook(book)
        })
    })
}

const user1 = {
    "id": 1,
    "username": "pouros"
  }

const renderBook = (book) => {
    const bookList = document.querySelector('#list')
    bookListItem = document.createElement('li')
    bookListItem.innerText = book.title
    bookList.appendChild(bookListItem)
    bookListItem.addEventListener('mouseover', () => selectedBook(book))
}
//select book
//render book item
const selectedBook = (book) => {
    getBooks()
    showPanel = document.querySelector('#show-panel') 
    showPanel.innerHTML = ""

    const bookImage = document.createElement('img')
    bookImage.src = book.img_url
    bookImage.height = 300
    showPanel.appendChild(bookImage)

    const bookTitle = document.createElement('h1')
    bookTitle.innerText = book.title
    showPanel.appendChild(bookTitle)

    if (book.subtitle){
        const bookSubtitle = document.createElement('h2')
        bookSubtitle.innerText = book.subtitle
        showPanel.appendChild(bookSubtitle)
    }

    const bookAuthor = document.createElement('h3')
    bookAuthor.innerText = book.author
    showPanel.appendChild(bookAuthor)

    const bookDesc = document.createElement('p')
    bookDesc.innerText = book.description
    showPanel.appendChild(bookDesc)

    const bookLikes = document.createElement('ul')
    showPanel.appendChild(bookLikes)

    book.users.forEach(user =>{
        const userLike = document.createElement('li')
        userLike.innerText = user.username
        bookLikes.appendChild(userLike) 
    })

    const likeBtn = document.createElement('button')
    likeUnliked(book)
    likeBtn.innerText = isLiked
    likeBtn.classList.add('like-button')
    showPanel.appendChild(likeBtn)

    likeBtn.addEventListener('click', () => {
            likeUnlike  = book.users.find(user => user.id === user1.id );
            if (likeUnlike){
                unlikeBook(book)
            }
            else{
                likeBook(book)
            }
    })
    
} 




const likeBook = (book) => {
    let userList =  book.users
    userList.push(user1)
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"users": userList})
    })
    .then(res => res.json())
    .then(book => {
        selectedBook(book)
    })
}

const unlikeBook = (book) => {
    let userList =  book.users.filter((user) =>{
        return user.id !== user1.id 
    })
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"users": userList})
    })
    .then(res => res.json())
    .then(book => {
        selectedBook(book)
    })
}


const test = () => {
    fetch(`http://localhost:3000/books/1`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"users": [user1]})
    })
    .then(res => res.json())
}

const likeUnliked = (book) => {
        likeUnlike  = book.users.find(user => user.id === user1.id );
        if (likeUnlike){
            isLiked = "UNLIKE"
        }
        else{
            isLiked = "LIKE"
        }
        return isLiked
}



