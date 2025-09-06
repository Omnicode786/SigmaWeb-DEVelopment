# Creating Your Own React Library & JSX
## Understanding React Internals - Chai aur Code

---

## MAIN CONCEPT: Building Custom React

### What We're Building
**Goal:** Create our own mini version of React to understand how React works internally. Not as powerful as real React but helps understand core concepts.

**Key Understanding:** React is not magic - it's just JavaScript that creates and manipulates DOM elements in a structured way.

---

## PART 1: CUSTOM REACT IMPLEMENTATION

### Basic Setup
Create a simple HTML file with a root div where we'll inject our custom React elements.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Custom React App</title>
</head>
<body>
    <div id="root"></div>
    <script src="./customReact.js"></script>
</body>
</html>
```

### How React Elements Actually Work
**Concept:** When you write JSX, React converts it into JavaScript objects (called React Elements) that describe what the UI should look like.

**React Element Structure:**
```javascript
const reactElement = {
    type: 'a',                    // HTML tag type
    props: {                      // Attributes/properties
        href: 'https://google.com',
        target: '_blank'
    },
    children: 'Click me to visit Google'  // Inner content
};
```

**Key Points:**
- `type` - What HTML element to create (div, p, a, etc.)
- `props` - All attributes like href, target, class, etc.
- `children` - Text or other elements inside this element

### Custom Render Method - Version 1
**Concept:** Create a function that takes a React element and injects it into the DOM.

```javascript
function customRender(reactElement, container) {
    // Create DOM element
    const domElement = document.createElement(reactElement.type);
    
    // Set inner content
    domElement.innerHTML = reactElement.children;
    
    // Set attributes manually (not scalable)
    domElement.setAttribute('href', reactElement.props.href);
    domElement.setAttribute('target', reactElement.props.target);
    
    // Inject into container
    container.appendChild(domElement);
}
```

**Problem:** Hard-coding each attribute doesn't scale well.

### Custom Render Method - Version 2 (Better)
**Concept:** Use loops to handle any number of attributes dynamically.

```javascript
function customRender(reactElement, container) {
    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.children;
    
    // Loop through all props and set them
    for (const prop in reactElement.props) {
        if (prop === 'children') continue;  // Skip children
        domElement.setAttribute(prop, reactElement.props[prop]);
    }
    
    container.appendChild(domElement);
}
```

**Usage:**
```javascript
const mainContainer = document.querySelector('#root');
customRender(reactElement, mainContainer);
```

---

## PART 2: UNDERSTANDING JSX & REACT COMPONENTS

### React Components are Just Functions
**Concept:** Every React component is simply a JavaScript function that returns JSX (which becomes React elements).

```javascript
function MyApp() {
    return (
        <div>
            <h1>Custom React!</h1>
        </div>
    );
}
```

**Key Understanding:** You can even call components as regular functions:
```javascript
MyApp()  // Works but not recommended
```

### What Happens Behind the Scenes
**Concept:** JSX is NOT valid JavaScript. Bundlers (like Vite) convert JSX into JavaScript objects.

**JSX (What you write):**
```javascript
<h1>Hello World</h1>
```

**JavaScript (What it becomes):**
```javascript
React.createElement('h1', null, 'Hello World')
```

### Variable Injection in JSX
**Concept:** You can inject JavaScript variables into JSX using curly braces `{}`.

```javascript
const username = "Chai aur React";

function MyApp() {
    return (
        <div>
            <h1>{username}</h1>  {/* Variable gets evaluated */}
        </div>
    );
}
```

**Important:** Only **evaluated expressions** work inside `{}`. You can't write if-else statements directly.

**Works:**
- `{username}`
- `{2 + 2}`
- `{username.toUpperCase()}`

**Doesn't work:**
- `{if(true) {...}}` - Use ternary operator instead

---

## PART 3: REACT.CREATEELEMENT METHOD

### Manual Element Creation
**Concept:** Instead of JSX, you can create React elements directly using `React.createElement()`.

**Syntax:** `React.createElement(type, props, children)`

```javascript
const reactElement = React.createElement(
    'a',                          // Element type
    {                            // Props object
        href: 'https://google.com',
        target: '_blank'
    },
    'Click me to visit Google'    // Children
);
```

### Why JSX is Better
**Concept:** JSX is more readable than `React.createElement()` but both do the same thing.

**Same result, different syntax:**
```javascript
// JSX (easier to read)
<a href="https://google.com" target="_blank">
    Click me to visit Google
</a>

// React.createElement (what JSX becomes)
React.createElement('a', 
    {href: 'https://google.com', target: '_blank'}, 
    'Click me to visit Google'
);
```

### Variable Injection with createElement
```javascript
const anotherUser = "Chai aur React";

const reactElement = React.createElement(
    'a',
    {href: 'https://google.com', target: '_blank'},
    'Click me to visit Google ',
    anotherUser  // Variable injection
);
```

---

## KEY CONCEPTS SUMMARY

### React Element Structure
**Every React element is an object with:**
- `type` - HTML tag or component name
- `props` - All attributes and properties
- `children` - Content inside the element

### How React Works Internally
1. **Parse JSX** - Convert JSX to JavaScript objects
2. **Create Virtual DOM** - Build tree structure of React elements  
3. **Render to DOM** - Convert React elements to actual DOM elements
4. **Inject into Container** - Add elements to webpage

### JSX Rules
- JSX looks like HTML but is JavaScript
- Use `{}` for variable injection
- Only evaluated expressions inside `{}`
- JSX gets converted to `React.createElement()` calls

### Component Rules
- Components are functions that return JSX
- Component names must start with capital letter
- Components can receive props as parameters
- Always return single parent element (or Fragment)

### Why Build Custom React?
**Understanding Benefits:**
- React is not magic - it's organized JavaScript
- Builds confidence in using React
- Helps understand Virtual DOM concept
- Makes debugging easier when you know internals

**Real React Differences:**
- Much more optimized algorithms
- Advanced reconciliation process
- Better error handling
- Performance optimizations
- More features (hooks, context, etc.)

---

## PRACTICAL TAKEAWAYS

### Development Workflow
1. **Write JSX** - Easy, HTML-like syntax
2. **Bundler processes** - Converts to JavaScript
3. **React creates elements** - JavaScript objects
4. **DOM manipulation** - Actual HTML elements created
5. **Browser renders** - User sees the webpage

### Best Practices Learned
- Understand what happens behind JSX
- Components are just functions
- React elements are just objects
- Custom implementations help understanding
- Real React has many optimizations we don't see

### Next Steps Understanding
- Virtual DOM diffing algorithms
- Component lifecycle
- State management
- Event handling
- React hooks internals

**Remember:** This custom React shows the basic concept. Real React has thousands of lines of optimized code for performance, error handling, and advanced features.