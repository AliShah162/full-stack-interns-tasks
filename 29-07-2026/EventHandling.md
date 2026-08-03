##  Event Handling in React

Event handling in React is similar to handling events in regular HTML and JavaScript, but with a few important differences. Events are actions that happen in the browser, like clicking a button, typing in an input, or moving the mouse. React handles events using special props that start with "on".

In React, you attach event handlers directly to JSX elements using camelCase names like onClick, onChange, onSubmit, onMouseOver, onKeyDown, and many others. You pass a function as the event handler, not a string like in HTML.

### Event Handling Syntax

In HTML, you write `onclick="handleClick()"` using a string. In React, you write `onClick={handleClick}` using a function reference. This is a key difference.

```jsx
// HTML
<button onclick="handleClick()">Click</button>

// React
<button onClick={handleClick}>Click</button>
```

React uses synthetic events, which means it wraps the browser's native events to ensure consistent behavior across all browsers. You don't need to worry about browser differences.

### Basic Examples

**Example 1: Click Event**

```jsx
function Button() {
  function handleClick() {
    alert('Button clicked!');
  }
  
  return <button onClick={handleClick}>Click me</button>;
}
```

**Example 2: Inline Event Handler**

```jsx
function Button() {
  return (
    <button onClick={() => alert('Button clicked!')}>
      Click me
    </button>
  );
}
```

**Example 3: Event Object**

The event object is automatically passed to the handler. You can use it to get information about the event.

```jsx
function Button() {
  function handleClick(event) {
    console.log('Event type:', event.type);
    console.log('Target element:', event.target);
    console.log('Button text:', event.target.textContent);
  }
  
  return <button onClick={handleClick}>Click me</button>;
}
```

### Common Event Types

**onClick** - Handles click events on elements

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

**onChange** - Handles input changes

```jsx
function NameInput() {
  const [name, setName] = useState('');
  
  function handleChange(event) {
    setName(event.target.value);
  }
  
  return (
    <input 
      type="text" 
      value={name} 
      onChange={handleChange} 
      placeholder="Enter your name"
    />
  );
}
```

**onSubmit** - Handles form submission

```jsx
function LoginForm() {
  function handleSubmit(event) {
    event.preventDefault();
    alert('Form submitted!');
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" />
      <button type="submit">Login</button>
    </form>
  );
}
```

**onMouseOver** - Handles mouse hover

```jsx
function Tooltip() {
  function handleMouseOver() {
    console.log('Mouse is over the element');
  }
  
  return <div onMouseOver={handleMouseOver}>Hover over me</div>;
}
```

**onKeyDown** - Handles keyboard input

```jsx
function KeyHandler() {
  function handleKeyDown(event) {
    console.log('Key pressed:', event.key);
  }
  
  return <input onKeyDown={handleKeyDown} placeholder="Press any key" />;
}
```

**onFocus and onBlur** - Handles focus events

```jsx
function InputField() {
  function handleFocus() {
    console.log('Input focused');
  }
  
  function handleBlur() {
    console.log('Input lost focus');
  }
  
  return (
    <input 
      onFocus={handleFocus} 
      onBlur={handleBlur} 
      placeholder="Click me"
    />
  );
}
```

### Passing Arguments to Event Handlers

Sometimes you need to pass extra data to your event handler. You can do this by using an arrow function or by using the bind method.

**Using Arrow Function:**

```jsx
function TodoList() {
  function handleDelete(id) {
    console.log('Deleting todo with ID:', id);
  }
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

**Using Bind Method:**

```jsx
function TodoList() {
  function handleDelete(id) {
    console.log('Deleting todo with ID:', id);
  }
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={handleDelete.bind(null, todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

### Preventing Default Behavior

Sometimes you need to prevent the default behavior of an event. For example, preventing a form from submitting and refreshing the page.

```jsx
function LoginForm() {
  function handleSubmit(event) {
    event.preventDefault();
    // Form won't reload the page
    alert('Form submitted!');
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Stop Propagation

You can stop event propagation to prevent the event from bubbling up to parent elements.

```jsx
function Parent() {
  function handleParentClick() {
    alert('Parent clicked');
  }
  
  return (
    <div onClick={handleParentClick}>
      <button onClick={(e) => {
        e.stopPropagation();
        alert('Button clicked only');
      }}>
        Click me
      </button>
    </div>
  );
}
```

### Complete Example

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  function handleInputChange(event) {
    setInput(event.target.value);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    }
  }
  
  function handleDelete(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  }
  
  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Important Rules to Remember

Event handlers must be functions, not strings. You pass a function reference or an arrow function.

Event handlers are camelCase: onClick, onChange, onSubmit, etc.

You should not call the function when passing it. You pass the function reference, not the result of calling it.

To pass arguments, use an arrow function or the bind method.

Always prevent default behavior when handling form submissions.

The event object is automatically passed to the handler.

### Summary

Event handling in React is straightforward and consistent. You attach event handlers using camelCase props, pass functions as handlers, and can access the event object. You can prevent default behavior and stop propagation when needed. Event handling is essential for creating interactive React applications. The syntax is similar to HTML but uses camelCase and functions instead of strings, making it more powerful and flexible.