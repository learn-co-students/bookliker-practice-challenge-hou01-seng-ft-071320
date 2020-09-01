document.addEventListener("DOMContentLoaded", ()=>{
    getBooks()

});

const userFirst = {"id":1, "username":"pouros"}

const getBooks = () => {
fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(json => json.forEach(book => {
        addBookToList(book);
    })
    )
}

// ADD BOOK TITLE TO LIST
const addBookToList = (book) => {
    const listElement = document.getElementById('list');
    const bookElement = document.createElement('li');

    bookElement.innerText = book.title;
    bookElement.dataset.id = book.id
    bookElement.addEventListener('mouseover', ()=>{
        getPanel(book.id);
    })

    listElement.appendChild(bookElement);

}

const getPanel = (id)=>{
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(json => json.find(book => book.id == id))
    .then(book => showPanel(book))
}


const showPanel = (book) => {
    const panelElement = document.getElementById('show-panel');
    const bookImg = document.createElement('img')
    const bookTitle = document.createElement('h2')
    const bookSubtitle = document.createElement('h2')
    const bookAuthor = document.createElement('h2')
    const bookDescription = document.createElement('p')
    const bookUsers = showUsersOnList(book.users)
    const bookLikeBtn = document.createElement('button')

    bookImg.src = book.img_url;
    bookTitle.innerText = book.title;
    bookSubtitle.innerText = book.subtitle;
    bookAuthor.innerText = book.author;
    bookDescription.innerText = book.description;
    bookLikeBtn.innerText = likeOrUnlike(book.users);
    bookLikeBtn.id = 'like-button'
    bookLikeBtn.addEventListener('click',(e)=>{
        e.preventDefault
        toggleLikeBtn(book);
    })

    while(panelElement.firstChild){
        panelElement.removeChild(panelElement.lastChild)
    }

    panelElement.append(bookImg,bookTitle,bookSubtitle,bookAuthor,bookDescription,bookUsers,bookLikeBtn)
}

const showUsersOnList = (users) => {
    const userList = document.createElement('ul');
    users.forEach( user =>{
        const userListElement = document.createElement('li');
        userListElement.innerText = user.username
        userList.appendChild(userListElement);
        }
    )
    return userList
}

const toggleLikeBtn = (book) =>{
    const button = document.getElementById('like-button');
    if(button.innerText === 'Like'){
        likeBook(book.id,book.users)
    }else{
        unlikeBook(book.id,book.users)
    }
}

const likeOrUnlike = (bookUsers)=>{
    if(bookUsers.find(user => user.id == userFirst.id)){
        return 'Unlike'
    }else{
        return 'Like'
    }
}

const likeBook = (id,bookUsers) => {
    bookUsers.push(userFirst)
    fetch(`http://localhost:3000/books/${id}`,{
        method: 'PATCH',
        body: JSON.stringify({"users": bookUsers}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => getPanel(res.id))
}

const unlikeBook = (id,bookUsers) => {
    const newArray = bookUsers.filter(user => user.id != userFirst.id);
    
    fetch(`http://localhost:3000/books/${id}`,{
        method: 'PATCH',
        body: JSON.stringify({"users": newArray}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => getPanel(res.id))
}