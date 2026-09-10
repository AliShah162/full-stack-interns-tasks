# HTTP Status Codes

## What Are They?

Every API response comes with a **3-digit number** that tells the client:
- ✅ Did it work?
- ❌ If not, whose fault was it?
- 🔍 What exactly happened?

**Format:** `1xx`, `2xx`, `3xx`, `4xx`, `5xx`

---

## The 5 Families (Just Know This First)

| Range | Meaning | Who's at fault |
|-------|---------|----------------|
| **1xx** | Info (rarely used) | — |
| **2xx** | ✅ Success | Nobody |
| **3xx** | 🔀 Redirect | — |
| **4xx** | ❌ Client error | **You (the client)** |
| **5xx** | 💥 Server error | **The server** |

**Memory trick:**
- **4xx** = *You* messed up
- **5xx** = *We* messed up

---

## The Ones You'll Actually Use (90% of the time)

### ✅ Success Codes (2xx)

| Code | Name | When to use |
|------|------|-------------|
| **200** | OK | GET, PUT, PATCH, DELETE succeeded |
| **201** | Created | POST created a new resource |
| **204** | No Content | DELETE succeeded, nothing to return |

---

### ❌ Client Errors (4xx)

| Code | Name | When to use |
|------|------|-------------|
| **400** | Bad Request | Missing/invalid data in request |
| **401** | Unauthorized | Not logged in / no token |
| **403** | Forbidden | Logged in, but no permission |
| **404** | Not Found | Resource doesn't exist |
| **409** | Conflict | Duplicate (e.g., email already exists) |
| **422** | Unprocessable Entity | Validation failed |

---

### 💥 Server Errors (5xx)

| Code | Name | When to use |
|------|------|-------------|
| **500** | Internal Server Error | Something broke on server |
| **503** | Service Unavailable | Server down / overloaded |

---

## 🔑 401 vs 403 — Know the Difference

| Code | Meaning | Analogy |
|------|---------|---------|
| **401** | "Who are you? Log in first." | No ID card |
| **403** | "I know you, but you can't enter." | ID card, wrong room |

---

## 🔑 400 vs 422 — Know the Difference

| Code | Meaning |
|------|---------|
| **400** | Request is malformed (bad JSON, missing fields) |
| **422** | Request is well-formed, but data is invalid (e.g., email format wrong) |

> In practice, many APIs just use **400** for both. That's fine for beginners.

---

## Real Examples

### Example 1 — GET a user
```http
GET /users/1
```
✅ Found:
```http
200 OK
{ "id": 1, "name": "Alice" }
```
❌ Doesn't exist:
```http
404 Not Found
{ "error": "User not found" }
```

---

### Example 2 — POST a new user
```http
POST /users
{ "name": "Bob", "email": "bob@mail.com" }
```
✅ Created:
```http
201 Created
{ "id": 2, "name": "Bob", "email": "bob@mail.com" }
```
❌ Missing email:
```http
400 Bad Request
{ "error": "Email is required" }
```
❌ Email already taken:
```http
409 Conflict
{ "error": "Email already exists" }
```

---

### Example 3 — DELETE a user
```http
DELETE /users/2
```
✅ Deleted:
```http
204 No Content
```
(no body returned)

❌ Not found:
```http
404 Not Found
```

---

### Example 4 — Access without token
```http
GET /profile
```
❌ Not logged in:
```http
401 Unauthorized
{ "error": "Please log in" }
```
❌ Logged in but not admin:
```http
403 Forbidden
{ "error": "Admins only" }
```

---

## Quick Rules for Your API

1. ✅ **200** for successful GET / PUT / PATCH / DELETE
2. ✅ **201** when POST creates something
3. ✅ **204** when DELETE has nothing to return
4. ✅ **400** for bad input
5. ✅ **401** for "not logged in"
6. ✅ **403** for "no permission"
7. ✅ **404** for "not found"
8. ✅ **409** for duplicates
9. ✅ **500** for unexpected server crashes

---

## Common Mistakes to Avoid

❌ Returning `200 OK` for an error
```http
200 OK
{ "error": "User not found" }   ← WRONG!
```

✅ Return the correct code
```http
404 Not Found
{ "error": "User not found" }   ← RIGHT!
```

❌ Using `500` for user mistakes
```http
500 Internal Server Error
{ "error": "Email is required" }  ← WRONG! It's a client issue
```

✅ Use `400`
```http
400 Bad Request
{ "error": "Email is required" }  ← RIGHT!
```

---

## Cheat Sheet

```
200  OK                  → Success
201  Created             → New resource made
204  No Content          → Success, no body
400  Bad Request         → Bad input
401  Unauthorized        → Not logged in
403  Forbidden           → No permission
404  Not Found           → Doesn't exist
409  Conflict            → Duplicate
422  Unprocessable       → Validation failed
500  Server Error        → We broke it
```

---

## Memory Trick

> **2**xx = 😊 "Yes!"
> **4**xx = 🤦 "You did something wrong"
> **5**xx = 😱 "We did something wrong"

---