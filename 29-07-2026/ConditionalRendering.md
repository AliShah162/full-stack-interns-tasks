import React from 'react'

const ConditionalRendering = () => {
    const fruits=['Apple','Banana','Mango','Orange']
  return (
    <div>
        {fruits[0]}
        {fruits[1]}
        {fruits[2]}
    </div>
  )
}

export default ConditionalRendering



##  Conditional Rendering in React

Conditional rendering in React works the same way conditions work in JavaScript. You use JavaScript operators like if, else, ternary operator, or logical AND to decide what to render.

React components return JSX. Conditional rendering means you choose which JSX to return based on certain conditions. The concept is simple. Your component checks a condition and renders different things depending on the result.

### Why Use Conditional Rendering?

Conditional rendering is used everywhere in React apps. You use it to show a login button when the user is logged out and a logout button when they are logged in. You use it to show a loading spinner while data is fetching and the actual content when data arrives. You use it to show error messages when something goes wrong and success messages when everything works.

Without conditional rendering, your app would show the same thing to everyone all the time. Conditional rendering makes your app dynamic and interactive.

### Different Ways to Do Conditional Rendering

There are many ways to conditionally render in React. Each method works well in different situations.

**1. If-Else Statement**

This is the most basic way. You use a regular if-else statement inside your component to return different JSX.

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please sign in</h1>;
  }
}
```

**2. Ternary Operator**

The ternary operator is shorter and more common. You use it when you have two possible things to render.

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}
    </div>
  );
}
```

**3. Logical AND Operator**

You use the logical AND operator when you want to render something only if a condition is true. If the condition is false, nothing is rendered.

```jsx
function Notification({ message }) {
  return (
    <div>
      {message && <p className="alert">{message}</p>}
    </div>
  );
}
```

**4. Switch Statement**

For multiple conditions, you can use a switch statement inside a function.

```jsx
function StatusMessage({ status }) {
  function getMessage() {
    switch(status) {
      case 'loading':
        return <p>Loading...</p>;
      case 'success':
        return <p>Success!</p>;
      case 'error':
        return <p>Error occurred</p>;
      default:
        return <p>Unknown status</p>;
    }
  }
  
  return <div>{getMessage()}</div>;
}
```

**5. Using Variables**

You can store JSX in a variable and then render it conditionally.

```jsx
function Greeting({ isLoggedIn, user }) {
  let greeting;
  
  if (isLoggedIn) {
    greeting = <h1>Welcome back, {user.name}!</h1>;
  } else {
    greeting = <h1>Please sign in</h1>;
  }
  
  return <div>{greeting}</div>;
}
```

### Common Use Cases

**Showing a Loading Spinner**

```jsx
function DataDisplay({ data }) {
  if (!data) {
    return <div className="spinner">Loading...</div>;
  }
  
  return <div>{data}</div>;
}
```

**Showing Error Messages**

```jsx
function Form({ error }) {
  return (
    <div>
      {error && <p className="error">{error}</p>}
      <form>...</form>
    </div>
  );
}
```

**Render Based on User Role**

```jsx
function Dashboard({ user }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {user.role === 'admin' && <AdminPanel />}
      {user.role === 'user' && <UserPanel />}
    </div>
  );
}
```

**Conditional Rendering in a List**

```jsx
function TodoList({ todos }) {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos yet. Add one!</p>
      ) : (
        <ul>
          {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
        </ul>
      )}
    </div>
  );
}
```

**Conditional Rendering with Multiple Conditions**

```jsx
function Message({ type, text }) {
  let className = 'message';
  
  if (type === 'success') {
    className += ' success';
  } else if (type === 'error') {
    className += ' error';
  } else if (type === 'warning') {
    className += ' warning';
  }
  
  return <div className={className}>{text}</div>;
}
```

**Conditional Rendering with Fragments**

```jsx
function ConditionalFragment({ show }) {
  return (
    <>
      {show && (
        <>
          <h1>Title</h1>
          <p>Content that shows conditionally</p>
        </>
      )}
    </>
  );
}
```

### Important Things to Remember

If-else statements cannot be used inside JSX. They only work outside the return statement. You cannot put an if statement inside curly braces.

Ternary operators and logical AND operators can be used inside JSX inside curly braces.

When a condition is false, the logical AND operator renders nothing. It does not render null or undefined, it simply renders nothing at all.

When rendering nothing conditionally, you can return null. React will not render anything.

### Complete Example

```jsx
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
  
  // Conditional rendering in action
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome back!</h1>
          {todos.length > 0 ? (
            <ul>
              {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
            </ul>
          ) : (
            <p>No todos yet</p>
          )}
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please login</h1>
          <button onClick={() => setIsLoggedIn(true)}>Login</button>
        </div>
      )}
    </div>
  );
}
```

### Summary

Conditional rendering is how you make React apps dynamic. It allows you to show different things based on user actions, data availability, or application state. You can use if-else statements, ternary operators, logical AND operators, or switch statements to handle conditions. Each method has its place. The key is to choose the right tool for the right situation and keep your code clean and readable.