// Ottieni il titolo di un post con una Promise.
// Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}

// 🎯 Bonus: Ottieni l'intero post con l'autore
// Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.

function getPost(id) {

    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(response => response.json())
            .then(data => resolve(data.title))
            .catch(error => reject(error))
    })
}

getPost(1)
    .then(response => console.log("Titolo del post:", response))
    .catch(error => console.error(error));


function getPostUser(id) {
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(response => response.json())
            .then(post => fetch(`https://dummyjson.com/users/${post.userId}`)
                .then(response => response.json())
                .then(user => {
                    post.user = user;
                    resolve(post);
                })
                .catch(error => reject(error)))
            .catch(error => reject(error))

    })
}

getPostUser(1)
    .then(post => {
        console.log("Post:", post.body);
        console.log("Autore:", post.user.firstName, post.user.lastName);
    })
    .catch(error => console.error(error))
