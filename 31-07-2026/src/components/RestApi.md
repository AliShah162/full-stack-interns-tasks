REST API Introduction
A REST API (Representational State Transfer API) enables communication between client and server over HTTP. It exchanges data typically in JSON format using standard web protocols.

* Uses HTTP methods like GET, POST, PUT, PATCH, and DELETE.
* Client sends requests to server endpoints (URLs).
* Server returns responses such as JSON, XML, HTML, or images.
* Maps HTTP methods to CRUD operations (Create, Read, Update, Delete).

---Common HTTP Methods Used in REST API---
In REST architecture, the main HTTP methods are GET, POST, PUT, PATCH, and DELETE, which map to CRUD operations. Other less commonly used methods include HEAD and OPTIONS.

1. GET Method
The HTTP GET method retrieves a resource. On success, it returns data (usually JSON or XML) with 200 OK, and on error, it commonly returns 404 Not Found or 400 Bad Request.

GET /users/123

2. POST Method
The POST method creates new resources. On success, it returns 201 Created with a Location header pointing to the new resource.

POST /users
{ 
  "name": "Anne", 
  "email": "gfg@example.com"
}

This request creates a new user with the given data.

 Note:  POST is neither safe nor idempotent. 


3. PUT Method
PUT is used to update or create a resource. It sends the complete resource in the request body and replaces the existing one at the specified URL.

PUT /users/123
{ 
  "name": "Anne", 
  "email": "gfg@example.com"
}

This request updates the user with ID 123 or creates a new user if one doesn't exist.

4. PATCH Method
PATCH is used to partially update a resource. It sends only the fields to be modified, instead of replacing the entire resource.

PATCH /users/123
{ 
  "email": "new.email@example.com" 
}

This request updates only the email of the user with ID 123, leaving the rest of the user data unchanged.


5. DELETE Method
It is used to delete a resource identified by a URI. On successful deletion, return HTTP status 200 (OK) along with a response body.

DELETE /users/123

This request deletes the user with ID 123.

Idempotence: An HTTP method is idempotent if making the same request multiple times results in the same server state as making it once. Repeated requests do not cause additional changes beyond the initial application




1) Example 1: GET - Fetch All Users
// Get all users (READ)
fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => {
        console.log(users)  // Array of all users
    })
    .catch(error => console.log('Oops!', error))

2) Example 2: POST - Create New User
// Create a new user (CREATE)
fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane@email.com',
        age: 28
    })
})
.then(res => res.json())
.then(newUser => {
    console.log('User created!', newUser)
})
.catch(error => console.log('Error!', error))

3) Example 3: DELETE - Remove User
// Delete user (DELETE)
fetch('https://jsonplaceholder.typicode.com/users/123', {
    method: 'DELETE'
})
.then(res => {
    if (res.ok) {
        console.log('User deleted! ')
    }
})
.catch(error => console.log('Error!', error))

4) Example 4: PUT - Update User
// Update entire user (UPDATE)
fetch('https://jsonplaceholder.typicode.com/users/123', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'Jane Smith',      // Changed name
        email: 'jane@email.com',
        age: 29                  // Changed age
    })
})
.then(res => res.json())
.then(updatedUser => {
    console.log('User updated!', updatedUser)
})
