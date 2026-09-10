# Resource Naming Conventions

## The Golden Rule

**URLs should describe *things* (resources), not *actions*.**

Think of your API like a library:
- You ask for **books**, not "getBook"
- The **action** is the HTTP method (GET, POST, etc.)

---

## Rule 1: Use Nouns, Not Verbs

❌ **Bad:**
```
GET  /getAllUsers
POST /createUser
POST /updateUser
POST /deleteUser
```

✅ **Good:**
```
GET    /users
POST   /users
PUT    /users/1
DELETE /users/1
```

The **HTTP method** is the verb. The **URL** is the noun.

---

## Rule 2: Use Plural Nouns

Always use plural, even for a single item.

❌ **Bad:**
```
/user
/user/1
/product/5
```

✅ **Good:**
```
/users
/users/1
/products/5
```

**Why?** Because `/users` means "the users collection" and `/users/1` means "one user from that collection."

---

## Rule 3: Use Lowercase & Hyphens

❌ **Bad:**
```
/Users
/UserProfiles
/user_profiles
/userProfiles
```

✅ **Good:**
```
/users
/user-profiles
/blog-posts
```

- ✅ lowercase
- ✅ hyphens (`-`) for multiple words
- ❌ no underscores, no camelCase, no UPPERCASE

---

## Rule 4: Use IDs for Specific Resources

```
/users/1          → user with ID 1
/users/42         → user with ID 42
/products/abc123  → product with ID abc123
```

---

## Rule 5: Nested Resources for Relationships

When a resource **belongs to** another:

```
/users/1/posts           → all posts by user 1
/users/1/posts/5         → post 5 by user 1
/users/1/posts/5/comments → comments on that post
```

**Format:** `/{parent}/{parentId}/{child}`

### ⚠️ Don't Nest Too Deep!

❌ **Bad:**
```
/users/1/posts/5/comments/3/likes/9/replies
```

✅ **Better:**
```
/comments/3/likes
/replies/9
```

**Rule of thumb:** Max 2 levels deep.

---

## Rule 6: Actions That Don't Fit CRUD

Sometimes you need an action (like "login" or "search"). Use a **verb as a sub-resource**:

```
POST /users/1/activate
POST /auth/login
GET  /products/search?q=laptop
```

Keep verbs rare and only when CRUD doesn't fit.

---

## Rule 7: Filtering, Sorting, Pagination = Query Params

Don't put these in the URL path — use `?key=value`:

```
GET /products?category=books
GET /products?sort=price&order=asc
GET /users?page=2&limit=10
GET /users?age=25&city=karachi
```

---

## Full Example — A Blog API

```
GET    /posts                    → list all posts
POST   /posts                    → create a post
GET    /posts/10                 → get post 10
PUT    /posts/10                 → update post 10
DELETE /posts/10                 → delete post 10

GET    /posts/10/comments        → comments on post 10
POST   /posts/10/comments        → add comment to post 10
DELETE /posts/10/comments/3      → delete comment 3

GET    /users/5/posts            → posts written by user 5

GET    /posts?tag=javascript     → filter posts by tag
GET    /posts?sort=date&page=1   → sort & paginate
```

Notice:
- Everything is **plural**
- **Nouns only** (comments, posts, users)
- **HTTP methods** do the work
- Filters go in **query params**

---

## Cheat Sheet

| Rule | Do ✅ | Don't ❌ |
|------|-------|---------|
| Use nouns | `/users` | `/getUsers` |
| Use plural | `/users` | `/user` |
| Lowercase | `/blog-posts` | `/BlogPosts` |
| Hyphens | `/user-profiles` | `/user_profiles` |
| Nested (max 2) | `/users/1/posts` | `/users/1/posts/2/comments/3` |
| Filters in query | `/users?age=25` | `/users/age/25` |
| Verbs rare | `/auth/login` | `/doLogin` |

---

## Quick Memory Trick

> **"Plural nouns in the URL, verbs in the HTTP method, filters in the query."**

---

