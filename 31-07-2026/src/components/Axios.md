Axios = fetch() with superpowers! It does the same thing but with less code and more features.

 fetch() vs Axios
 Followig is the difference between fetch and axios:
 1. Error Handling

// fetch() - You have to check manually
fetch('https://api.com/posts')
    .then(res => {
        if (!res.ok) {  // 👈 Must check manually!
            throw new Error('Request failed')
        }
        return res.json()
    })

// Axios - Auto handles errors
axios.get('https://api.com/posts')
    .then(res => console.log(res.data))
    .catch(err => console.log('Error!', err))  // 👈 Automatically catches


2. JSON Parsing
// fetch() - Manual parsing
fetch('https://api.com/posts')
    .then(res => res.json())  // 👈 Must convert to JSON
    .then(data => console.log(data))

// Axios - Auto parsing
axios.get('https://api.com/posts')
    .then(res => console.log(res.data))  // 👈 Already parsed!

3. Request Body

// fetch() - Manual stringify
fetch('https://api.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title: 'My Post' })  // 👈 Must stringify
})

// Axios - Auto stringify
axios.post('https://api.com/posts', {
    title: 'My Post'  // 👈 No need to stringify!
})


<!-- CODE EXAMPLE -->
* Same Code: fetch vs Axios
fetch() Version

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: title,
        body: body,
        userId: 1
    })
})
.then(res => {
    if (!res.ok) {
        throw new Error('Failed to post')
    }
    return res.json()
})
.then(data => {
    console.log(data)
    setPosts([data, ...posts])
})
.catch(error => {
    console.log('Error:', error)
})




* Axios Version (Easier!)
import axios from 'axios'

axios.post('https://jsonplaceholder.typicode.com/posts', {
    title: title,
    body: body,
    userId: 1
})
.then(res => {
    console.log(res.data)
    setPosts([res.data, ...posts])
})
.catch(error => {
    console.log('Error:', error)
})
