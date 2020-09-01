document.addEventListener("DOMContentLoaded", function() {
    fetch(' http://localhost:3000/books')
    .then(res=>res.json())
    .then(data=>{loadbooks(data)})
    const list=document.getElementById("list")
    const show=document.getElementById("show-panel")

    function loadbooks(data){
        data.forEach(d=>{
        
            li=document.createElement("li")
            ul=document.createElement("ul")

            li.innerText=d.title
            list.appendChild(li)
            
            li.addEventListener('click',()=>{loaddetail(d)})
        })
    }
    function loaddetail(d){ 
        ul.innerHTML=""
        desc=document.createElement("p")
        img=document.createElement("img")
        img.src=d.img_url
        desc.innerText=d.description
        likebutton=document.createElement("button")
        likebutton.innerText='Likes'
        likebutton.addEventListener('click',()=>{newlikes(d)})
        users=d.users
        ul.appendChild(img)
        ul.appendChild(desc)
        
        users.forEach(user=>{
            userli=document.createElement("li")
            userli.innerText=user.username
            ul.appendChild(userli)
        })
        ul.appendChild(likebutton)
        show.appendChild(ul)
    };
    const newlikes=(book)=>{
        const user1 = {"id":1, "username":"pouros"}
        book.users.push(user1)
        console.log(user1)

        fetch(`http://localhost:3000/books/${book.id}`,
            {method: "PATCH",
            headers:{
                "content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
        .then(res=>res.json())
        .then(likes=>loaddetail(book))
        
    }

})

