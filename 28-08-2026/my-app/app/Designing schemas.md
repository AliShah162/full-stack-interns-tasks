## The Big Picture: What is Schema Design?

**Schema design** is the process of deciding:
1. **What collections/tables** you need
2. **What fields** each collection has
3. **How collections relate** to each other
4. **When to embed** vs **when to reference**

**Analogy:** You're an architect designing a house. 
- The **rooms** = Collections/Tables
- The **furniture** = Fields/Columns
- The **hallways** = Relationships (Foreign Keys)
- The **blueprint** = Your ER Diagram

---

## The Golden Rule of Schema Design

> **"Design for your application's queries, not for the data itself."**

This is the #1 mistake beginners make. They ask: *"What data do I have?"* 

Instead, ask: *"What questions will my app ask the database?"*

---

## Case Study: Building a "Task Management" App (Like Trello/Asana)

Let's design a real app together. We'll build a **Team Task Manager** where:
- Users can sign up
- Users belong to Teams
- Teams have Projects
- Projects have Tasks
- Tasks are assigned to Users

---

## Step 1: Identify the Entities (The "Nouns")

Based on the requirements, our main entities are:

| Entity | Description |
| :--- | :--- |
| **User** | People using the app |
| **Team** | Groups of Users |
| **Project** | A collection of Tasks |
| **Task** | A single to-do item |

---

## Step 2: Identify the Relationships (The "Verbs")

Ask: *"How do these things connect?"*

| Relationship | Type | Explanation |
| :--- | :--- | :--- |
| **User** belongs to **Team** | Many-to-Many | A User can be in multiple Teams, a Team has many Users |
| **Team** has **Project** | One-to-Many | One Team can have many Projects |
| **Project** has **Task** | One-to-Many | One Project can have many Tasks |
| **Task** assigned to **User** | Many-to-One | One User can have many Tasks assigned to them |

---

## Step 3: Create the ER Diagram

```
┌─────────────────┐          ┌─────────────────┐
│      User       │          │      Team       │
├─────────────────┤          ├─────────────────┤
│ user_id (PK)    │  M   M   │ team_id (PK)    │
│ name            ├──────────┤ name            │
│ email           │          │ description     │
│ password_hash   │          └─────────────────┘
│ profile_pic     │                │
└─────────────────┘                │ 1
        │                          │
        │ M                        │ M
        │                          │
        │                    ┌─────▼─────┐
        │                    │  Project  │
        │                    ├───────────┤
        │                    │ proj_id(PK)│
        │                    │ name      │
        │                    │ team_id(FK)│
        │                    │ start_date│
        │                    │ end_date  │
        │                    └───────────┘
        │                          │ 1
        │                          │
        │ M                        │ M
        │                          │
        │                    ┌─────▼─────┐
        └───────────────────►│   Task    │
                 M       1   ├───────────┤
                             │ task_id(PK)│
                             │ title     │
                             │ description│
                             │ status    │
                             │ priority  │
                             │ due_date  │
                             │ proj_id(FK)│
                             │ assignee(FK)│
                             └───────────┘
```

---

## Step 4: The Big Decision — Embed or Reference?

This is the **most important** decision in MongoDB schema design.

| Approach | What it means | When to use |
| :--- | :--- | :--- |
| **Embedding** | Put related data **inside** the parent document | Data is always used together, never stands alone |
| **Referencing** | Store an **ID** that points to another collection | Data is used independently, or grows indefinitely |

---

### Example: Tasks inside a Project

**Option A: Embed Tasks in Project (Nested)**
```json
{
  "_id": "proj_123",
  "name": "Build Website",
  "team_id": "team_456",
  "tasks": [
    { "title": "Design Homepage", "status": "done", "assignee": "user_1" },
    { "title": "Build API", "status": "in_progress", "assignee": "user_2" }
  ]
}
```

**Option B: Reference Tasks (Separate Collection)**
```json
// projects collection
{
  "_id": "proj_123",
  "name": "Build Website",
  "team_id": "team_456"
}

// tasks collection
{
  "_id": "task_1",
  "title": "Design Homepage",
  "status": "done",
  "assignee": "user_1",
  "project_id": "proj_123"
}
```

---

### Which One Should We Choose?

Let's ask the **Golden Question**: *"What queries will my app run?"*

| Query | Frequency | Impact on design |
| :--- | :--- | :--- |
| Show all tasks for a Project | Very often | Need to access tasks by project |
| Show a single Task's details | Very often | Need to retrieve individual tasks |
| Update a Task's status | Very often | Need to update tasks independently |
| Show total task count per Project | Often | Need to count tasks per project |
| Assign a Task to a User | Often | Need to update assignee |

**Decision:** Since Tasks:
- Are frequently updated independently
- Need to be queried individually
- Can grow to hundreds per project (unbounded array)

**We should REFERENCE tasks** (Option B).

---

## Step 5: Write the Final Schema (MongoDB)

### Collection 1: `users`
```json
{
  "_id": ObjectId("..."),
  "email": "alice@email.com",
  "password_hash": "$2b$10$...",
  "name": "Alice Johnson",
  "profile_pic": "https://...",
  "teams": ["team_1", "team_2"],  // Array of Team IDs (referencing)
  "created_at": ISODate("2025-01-15T00:00:00Z")
}
```

### Collection 2: `teams`
```json
{
  "_id": ObjectId("..."),
  "name": "Product Team",
  "description": "Building the core product",
  "created_by": ObjectId("user_1"),
  "members": ["user_1", "user_2", "user_3"],  // Array of User IDs
  "created_at": ISODate("2025-01-15T00:00:00Z")
}
```

### Collection 3: `projects`
```json
{
  "_id": ObjectId("..."),
  "name": "Website Redesign",
  "description": "Redesign the company website",
  "team_id": ObjectId("team_1"),  // Reference to Team
  "start_date": ISODate("2025-02-01"),
  "end_date": ISODate("2025-03-01"),
  "status": "active",
  "created_at": ISODate("2025-01-20T00:00:00Z")
}
```

### Collection 4: `tasks`
```json
{
  "_id": ObjectId("..."),
  "title": "Design Homepage Mockup",
  "description": "Create high-fidelity Figma mockup",
  "status": "in_progress",  // pending, in_progress, done, blocked
  "priority": "high",       // low, medium, high, critical
  "project_id": ObjectId("proj_123"),  // Reference to Project
  "assignee_id": ObjectId("user_1"),   // Reference to User (assigned to)
  "created_by": ObjectId("user_2"),    // Reference to User (creator)
  "due_date": ISODate("2025-02-15"),
  "created_at": ISODate("2025-01-25T00:00:00Z"),
  "updated_at": ISODate("2025-01-26T00:00:00Z")
}
```

---

## Step 6: Create Indexes for Performance

Based on our queries, we need these indexes:

| Index | Why |
| :--- | :--- |
| `{ "email": 1 }` | Fast login lookups |
| `{ "team_id": 1 }` | Get all projects for a team |
| `{ "project_id": 1 }` | Get all tasks for a project |
| `{ "assignee_id": 1 }` | Get all tasks assigned to a user |
| `{ "status": 1, "project_id": 1 }` | Filter tasks by status in a project |
| `{ "due_date": 1 }` | Sort tasks by due date |
| `{ "teams": 1 }` | Find all users in a team |

```javascript
// Create the indexes
db.users.createIndex({ "email": 1 });
db.projects.createIndex({ "team_id": 1 });
db.tasks.createIndex({ "project_id": 1 });
db.tasks.createIndex({ "assignee_id": 1 });
db.tasks.createIndex({ "status": 1, "project_id": 1 });
db.tasks.createIndex({ "due_date": 1 });
db.users.createIndex({ "teams": 1 });
```

---

## Step 7: Write Real Queries

### Query 1: Get all tasks for a specific project

```javascript
db.tasks.find({ project_id: ObjectId("proj_123") })
  .sort({ priority: -1, due_date: 1 })
  .limit(50);
```

### Query 2: Get all tasks assigned to a user

```javascript
db.tasks.find({ assignee_id: ObjectId("user_1"), status: { $ne: "done" } })
  .sort({ due_date: 1 });
```

### Query 3: Get all teams a user belongs to

```javascript
const user = db.users.findOne({ _id: ObjectId("user_1") });
db.teams.find({ _id: { $in: user.teams } });
```

### Query 4: Get project stats (with aggregation)

```javascript
db.tasks.aggregate([
  { $match: { project_id: ObjectId("proj_123") } },
  { $group: {
      _id: "$status",
      count: { $sum: 1 }
  } },
  { $sort: { count: -1 } }
]);
```

**Output:**
```json
[
  { "_id": "in_progress", "count": 5 },
  { "_id": "done", "count": 12 },
  { "_id": "pending", "count": 3 },
  { "_id": "blocked", "count": 1 }
]
```

---

## Decision Matrix: Embed vs Reference

Use this cheat sheet when designing your schemas:

| Question | Answer | Action |
| :--- | :--- | :--- |
| Is this data **always** used with the parent? | Yes | **Embed** it |
| Does this data ever stand alone? | Yes | **Reference** it |
| Does this data grow indefinitely? | Yes | **Reference** it |
| Do I need to query this data independently? | Yes | **Reference** it |
| Is this data small and fixed (e.g., address)? | Yes | **Embed** it |
| Do I need to update this data frequently? | Yes | **Reference** it |

---

## Your Practice Task

Design a schema for a **Blog Platform** with:

- **Authors** (name, email, bio)
- **Posts** (title, content, published_date)
- **Comments** (text, author, date)
- **Tags** (name, description)

**Questions to answer:**
1. What are the collections?
2. What are the relationships? (1:1, 1:M, M:M)
3. What gets embedded? What gets referenced?
4. What indexes do you need?
5. Write a query to get all posts by an author, with their comments.

---

## Summary Cheat Sheet

| Concept | What it means |
| :--- | :--- |
| **Entities** | The main "things" in your app |
| **Relationships** | How entities connect |
| **Embedding** | Store related data inside the parent |
| **Referencing** | Store an ID pointing to another collection |
| **Indexes** | Speed up your most common queries |
| **Design for queries** | Think about what questions your app asks, not just what data you have |

---