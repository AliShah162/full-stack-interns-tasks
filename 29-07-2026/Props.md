## 🔷 What are Props in React?

Props (short for "properties") are how components communicate with each other in React. They are like arguments you pass to a function, but for React components. Props are read-only pieces of data that a parent component passes down to its child components.

Think of props as the "settings" for a component. You give a component some props, and it uses them to render itself accordingly. Props are passed from parent to child, flowing downward like a waterfall.

### How Props Work

When a parent component renders a child component, it can pass props as attributes. The child component receives all the props as a single JavaScript object. The child can then access the data using dot notation.

```jsx
function ChildComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}

function ParentComponent() {
  return <ChildComponent name="John" age={25} />;
}
```

### Props are Read-Only

One of the most important rules about props is that they are read-only. A component cannot modify its own props. If you need to modify data, you should use state instead. Props are only meant for receiving data from a parent.

```jsx
function Greeting({ name }) {
  // This is NOT allowed
  // name = "Jane";
  
  // This IS allowed
  return <h1>Hello, {name}!</h1>;
}
```

### Passing Different Types of Props

You can pass any JavaScript data type as props: strings, numbers, booleans, arrays, objects, functions, and even other React components.

```jsx
function UserInfo({ user, isActive, onAction }) {
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Active: {isActive ? 'Yes' : 'No'}</p>
      <button onClick={onAction}>Action</button>
    </div>
  );
}

function App() {
  const user = { name: 'John', email: 'john@email.com' };
  
  return (
    <UserInfo 
      user={user}
      isActive={true}
      onAction={() => console.log('Button clicked')}
    />
  );
}
```

### Default Props

You can set default values for props in case the parent doesn't pass them. This is a good practice to make your components more robust. Default props ensure that your component always has a value to use.

```jsx
function Greeting({ name = 'Guest' }) {
  return <h1>Hello, {name}!</h1>;
}
```

### Passing Functions as Props

Functions can also be passed as props. This is a common pattern for child components to communicate back to the parent. The child calls the function when something happens, and the parent can react accordingly.

```jsx
function Button({ onClick, label = 'Click me' }) {
  return <button onClick={onClick}>{label}</button>;
}

function App() {
  function handleClick() {
    alert('Button clicked!');
  }
  
  return <Button onClick={handleClick} label="Submit" />;
}
```

### The Children Prop

React has a special prop called children. It's automatically passed to components and contains the content between the opening and closing tags. This is useful for creating wrapper components.

```jsx
function Card({ children, title }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px' }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function App() {
  return (
    <Card title="Welcome">
      <p>This is the content inside the card.</p>
      <button>Click me</button>
    </Card>
  );
}
```

### Destructuring Props

Most React developers use destructuring to extract props. This makes the code cleaner and more readable. You can destructure directly in the function parameters.

```jsx
// Without destructuring
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// With destructuring
function Welcome({ name, age, city }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
}
```

### Prop Drilling

When you pass props through multiple levels of components, it's called prop drilling. This can make your code messy. Sometimes you need to pass a prop from the top of your app all the way down through components that don't even use it.

```jsx
function Grandparent() {
  const user = { name: 'John', email: 'john@email.com' };
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />;
}

function Child({ user }) {
  return <div>{user.name}</div>;
}
```

### Avoiding Prop Drilling

To avoid prop drilling, you can use other patterns like Context API or state management libraries like Redux or Zustand. These allow you to access data from anywhere in your component tree without passing props through intermediate components.

### Props vs State

Props and state are both used to hold data, but they serve different purposes.

Props are passed from parent to child and are read-only. They cannot be modified by the receiving component. State is managed inside a component and can be updated. Changes to state trigger re-renders.

Props are used for component configuration and communication. State is used for dynamic data that changes over time within a component.

### Spreading Props

You can use the spread operator to pass all properties of an object as props. This is useful for wrapper components that pass through props to their children.

```jsx
function Button(props) {
  return <button {...props}>Click</button>;
}

function App() {
  return (
    <Button 
      className="primary"
      disabled={false}
      onClick={() => console.log('clicked')}
    />
  );
}
```

### Summary

Props are the way components talk to each other in React. They are read-only pieces of data passed from parent to child. You can pass any data type as props, including strings, numbers, objects, arrays, and functions. Props are the foundation of component composition in React and understanding them is essential for building React applications. The key rules are: props are read-only, they flow downward from parent to child, and they can be any data type including functions. Props make your components configurable and reusable.