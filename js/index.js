document.addEventListener("DOMContentLoaded", () => {
    
    fetchBook()
});

const fetchBook = () => {
    fetch(`http://localhost:3000/books`)
    .then(res => res.json())
    .then(json => renderBooks(json))
}

const renderBooks = (books) => {
    books.forEach(book => {
        renderBook(book)
    });
}

const renderBook = (book) => {
    console.log(book)
    const ulBookDiv = document.getElementById('list')

    const listedBook = document.createElement('li')
    listedBook.innerText = `${book.title}`

    ulBookDiv.appendChild(listedBook)

    listedBook.addEventListener('click', () => {
        
        bookInfo(book) 
    })

    const bookInfo = (book) => {
        const showDiv = document.getElementById('show-panel')
        const infoDiv = document.createElement('div')

        showDiv.innerHTML = ""
        showDiv.appendChild(infoDiv)

        infoDiv.innerHTML = `<img src = ${book.img_url}>
        <h3>${book.title}</h3>
        <h3>${book.subtitle}</h3>
        <h3>${book.author}</h3>
        <p>${book.description}</p>`

        const userUl = document.createElement('ul')
        infoDiv.appendChild(userUl)

        book.users.forEach(user => {
            const userLi = document.createElement('li')

            userLi.innerHTML = `${user.username}`

            userUl.appendChild(userLi)
        })

        const likeButton = document.createElement('button')
        likeButton.innerText = "LIKE"
        infoDiv.appendChild(likeButton)

        likeButton.addEventListener('click', () => {
            fetchUser(book)
        })

        const fetchUser = (book) => {
            const user1 = {"id":1, "username":"pouros"}
            book.users.push(user1)

            fetch(`http:localhost:3000/books/${book.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(book)
            })
            .then(res => res.json())
            .then(json => bookInfo(book))
        }
    }
    
}