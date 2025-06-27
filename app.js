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



// Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.
// 🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
// Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".


function lanciaDado() {
    return new Promise((resolve, reject) => {
        console.log('Sto lanciando il dado...')
        setTimeout(() => {
            const probabilita = Math.random();

            if (probabilita < 0.2) {
                reject('Il dado si è incastrato!')
            } else {
                const numero = Math.floor(Math.random() * 6) + 1;
                resolve(`Il numero è: ${numero}`)
            }
        }, 3000)
    })
}

lanciaDado()
    .then(response => console.log(response))
    .catch(error => console.log(error))


function creaLanciaDado() {

    let ultimoLancio = null;

    return function () {
        return new Promise((resolve, reject) => {
            console.log('Sto lanciando il dado...')
            setTimeout(() => {
                const probabilita = Math.random();

                if (probabilita < 0.2) {
                    reject('Il dado si è incastrato!')
                    return;
                }

                const numero = Math.floor(Math.random() * 6) + 1;

                if (numero === ultimoLancio) {
                    console.log('Incredibile!')
                }

                ultimoLancio = numero;
                resolve(numero)
            }, 3000)
        })
    }

}

const lancio = creaLanciaDado();

lancio()
    .then(num => console.log("Primo lancio:", num))
    .then(() => lancio())
    .then(num => console.log("Secondo lancio:", num))
    .catch(err => console.error(err))