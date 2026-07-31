##  Code Organization - The Simple Version

### What is Code Organization?
**How you arrange your code inside files** - not folders, but the actual code itself.

---

##  Rules to Follow

### 1. **Keep Components Small**
```javascript
//  BAD - 200 lines, does everything
function Dashboard() {
    // Header code (30 lines)
    // Sidebar code (40 lines)
    // Main content (50 lines)
    // Footer code (30 lines)
    // API calls (30 lines)
    // State logic (20 lines)
}

//  GOOD - Split into smaller components
function Dashboard() {
    return (
        <>
            <Header />
            <Sidebar />
            <MainContent />
            <Footer />
        </>
    )
}
```

---

### 2. **Order Your Code Consistently**
```javascript
//  Standard order for every component

import React, { useState, useEffect } from 'react'  // 1. Imports
import { Button, Card } from './components'

const MyComponent = () => {                       // 2. Component
    // 3. State hooks
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    
    // 4. Custom hooks
    const user = useAuth()
    const posts = useFetch('/posts')
    
    // 5. Event handlers
    function handleSubmit() { ... }
    function handleDelete() { ... }
    
    // 6. Helper functions
    function formatData() { ... }
    
    // 7. Effects
    useEffect(() => { ... }, [])
    
    // 8. Return (JSX)
    return (
        <div>
            {data.map(item => ...)}
        </div>
    )
}

export default MyComponent                    // 9. Export
```

---

### 3. **Group Related Things Together**
```javascript
//  BAD - Mixed up
function TodoApp() {
    const [todos, setTodos] = useState([])
    const handleDelete = () => {}
    const [title, setTitle] = useState('')
    const handleAdd = () => {}
    const handleEdit = () => {}
    const [editId, setEditId] = useState(null)
}

//  GOOD - Grouped by purpose
function TodoApp() {
    // === STATE ===
    const [todos, setTodos] = useState([])
    const [title, setTitle] = useState('')
    const [editId, setEditId] = useState(null)
    
    // === HANDLERS ===
    function handleAdd() { ... }
    function handleDelete() { ... }
    function handleEdit() { ... }
}
```

---

### 4. **Don't Repeat Yourself (DRY)**
```javascript
//  BAD - Duplicate code
function HomePage() {
    return <button style={{ padding: 10, background: 'blue', color: 'white' }}>Click</button>
}

function AboutPage() {
    return <button style={{ padding: 10, background: 'blue', color: 'white' }}>Submit</button>
}

//  GOOD - One reusable component
function Button({ children }) {
    return <button style={{ padding: 10, background: 'blue', color: 'white' }}>{children}</button>
}

<Button>Click</Button>
<Button>Submit</Button>
```

---

### 5. **Use Descriptive Names**
```javascript
//  BAD - Vague names
function a() {}
const x = 5
function handle() {}

//  GOOD - Clear names
function formatDate() {}
const maxRetries = 5
function handleSubmit() {}
```

---

### 6. **Comment Only When Needed**
```javascript
//  BAD - Obvious comments
// This adds two numbers
function add(a, b) {
    return a + b  // Return sum
}

//  GOOD - Comments for WHY, not WHAT
// Fix: Using Date.now() because API requires unique IDs
const uniqueId = Date.now()
```

---

### 7. **Separate UI from Logic**
```javascript
//  BAD - Mixed together
function UserList() {
    // API call here...
    // Loading state here...
    // Error handling here...
    return <div>Renders here...</div>
}

// GOOD - Logic in custom hook
function UserList() {
    const { users, loading, error } = useUsers()
    if (loading) return <Loading />
    if (error) return <Error />
    return <div>{users.map(...)}</div>
}
```

---

##  Quick Reference

| Rule | Example |
|------|---------|
| **Keep components small** | Split 200-line into 5 components |
| **Standard order** | Imports → State → Handlers → Return |
| **Group related code** | All state together, all handlers together |
| **Don't repeat** | Make reusable components |
| **Descriptive names** | `handleSubmit` not `handle` |
| **Comments for WHY** | "Why" more important than "What" |
| **Separate UI/Logic** | Use custom hooks for logic |

---

##  One-Line Summary

> **Keep it clean, keep it organized, keep it readable.** 