# Day 3 - REST API Principles & Best Practices

## What is REST?

**REST** = Representational State Transfer

It's a set of rules for building APIs that are:
- Simple
- Predictable
- Easy to understand

---

## Core Principles (Keep it Simple)

### 1. **Client-Server**
- Client (frontend) and Server (backend) are separate
- They talk via HTTP requests

### 2. **Stateless**
- Each request is independent
- Server doesn't remember previous requests
- Every request must contain all needed info

### 3. **Use HTTP Methods (Verbs)**

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Read data | Get all users |
| POST | Create data | Add new user |
| PUT | Update (full) | Replace user |
| PATCH | Update (partial) | Update user's name |
| DELETE | Remove data | Delete user |

### 4. **Use Nouns in URLs (Not Verbs)**

✅ **Good:**
```
GET    /users
POST   /users
GET    /users/123
PUT    /users/123
DELETE /users/123
```

❌ **Bad:**
```
GET  /getUsers
POST /createUser
GET  /deleteUser/123
```

---

## Best Practices

### 1. **Use Plural Nouns**
```
✅ /users
✅ /products
❌ /user
❌ /product
```

### 2. **Use Proper Status Codes**

| Code | Meaning |
|------|---------|
| 200 | OK (success) |
| 201 | Created (new resource) |
| 400 | Bad Request (client error) |
| 404 | Not Found |
| 500 | Server Error |

### 3. **Return JSON**
```json
{
  "id": 1,
  "name": "John",
  "email": "john@example.com"
}
```

### 4. **Nested Routes for Relationships**
```
GET /users/123/posts        → posts by user 123
GET /users/123/posts/45     → specific post
```

### 5. **Use Query Params for Filtering**
```
GET /users?age=25
GET /products?category=books&sort=price
```

---

## Quick Example

**A simple Users API:**

```
GET    /users          → Get all users
GET    /users/1        → Get user 1
POST   /users          → Create new user
PUT    /users/1        → Update user 1
DELETE /users/1        → Delete user 1
```

**Request example:**
```http
POST /users
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com"
}
```

**Response example:**
```http
201 Created

{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}
```

---

## Golden Rules (Memorize These)

1. ✅ URLs = **nouns**, HTTP methods = **verbs**
2. ✅ Use **plural** resource names
3. ✅ Return proper **status codes**
4. ✅ Keep it **stateless**
5. ✅ Always return **JSON**

---