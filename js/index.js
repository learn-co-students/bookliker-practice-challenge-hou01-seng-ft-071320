document.addEventListener("DOMContentLoaded", function() {
    fetchBooks()
    function fetchBooks(){
        return fetch("http://localhost:3000/books")
        .then(resp => resp.json())
        .then(json =>renderBooks(json))
    }
    
    const self = {"id":1, "username":"pouros"}
    
    const renderBooks = (books) => {
        const bookList = document.querySelector('ul')
        books.forEach(book => {
            const li = document.createElement('li')
            li.innerHTML = book.title
            bookList.appendChild(li)
            li.addEventListener("click", (e) =>{
                bookInfo(book)
            })
        })
    }
    
    const bookInfo = (book) =>{
        const bookPanel = document.getElementById("show-panel")
        while(bookPanel.firstChild) bookPanel.removeChild(bookPanel.firstChild)
        
        const bookDiv = document.createElement('div')

        const bookImg = document.createElement('img')
        bookImg.src = book.img_url
        
        const titleP = document.createElement('p')
        titleP.innerHTML = book.title
        
        const subtitleP = document.createElement('p')
        subtitleP.innerHTML = book.subtitle

        const descriptionP = document.createElement('p')
        descriptionP.innerHTML = book.description 

        const userP = document.createElement('p')
        
        book.users.forEach( user =>{
            const userLi = document.createElement('li')
            userLi.innerHTML = user.username
            userP.appendChild(userLi)
        })

        const likeButton = document.createElement('button')
        for(const user of book.users){
            if (user.id == 1){
                likeButton.innerHTML = "Like"
            } else {
                likeButton.innerHTML = "Unlike"
            }
        }
        

        likeButton.addEventListener("click", (e) =>{
            submitLike(book)

            
        })

        bookPanel.append(bookDiv)
        bookDiv.append(bookImg, titleP, subtitleP, descriptionP, userP, likeButton)
    }

    const submitLike = (book) =>{
        book.users.push(self)
        fetch('http://localhost:3000/books/${book.id}', {method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'},
                body: JSON.stringify({"users": book.users})
            }).then(resp => resp.json())
            .then(bookInfo(book))
    }

        
    
});

