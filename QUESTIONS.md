##### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

Unlike regular Components, PureComponents only re-render when the props passed to them change or when state changes. They are used to improve the performance of regular Components and prevent unnecessary re-renders. shouldComponentUpdate is not recommended for use in a PureComponent as it is used implicitly by performing a shallow comparison of state and props to determine if it should re-render or not.

It is not advisable to use PureComponent if props or state are not immutable, or if you plan to implement your own shouldComponentUpdate lifecycle method. You should also make sure to keep track of PureComponents so that if they ever receive props that rapidly change, you convert them back to regular Components so you don't hinder performance with an extra state/prop comparison that always fails.

##### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Sometimes, shouldComponent can block values passed down from context to child components. createContext() addresses this problem.

##### 3. Describe 3 ways to pass information from a component to its PARENT.

- Create a callback function (that sets state for example) in the Parent Component. Pass the function as prop to the Child Component. Call the function from the child component with information that can then be used in the Parent Component.
- Using the Context API. Context provides a way to pass data through the component tree without having to pass props down manually at every level.
- Using State Management Libraries like Redux (they use Context internally)

##### 4. Give 2 ways to prevent components from re-rendering.

- Memoization using useMemo and useCallback hooks. useMemo for values and components, useCallback for functions.
- By using useRef to update values instead of useState.

##### 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragments allow us to render a group of elements without wrapping them with a Parent Element. They can help us limit the over-use of div elements. The use of Fragment reduces the amount of elements in the DOM generally which can improve performance.

##### 6. Give 3 examples of the HOC pattern.

- A Blog List component that renders a mapped list of "BlogListEntry" components.
- Redux connect
- withRouter in React Router

##### 7. what's the difference in handling exceptions in promises, callbacks and async...await.

Promises: Exceptions thrown in a promise are caught in the .catch() method.
Callbacks: It is possible to handle exceptions thrown in a callback if the callback uses a try/catch block internally.
async...await: We use try catch blocks to handle exceptions thrown in async/await calls.

##### 8. How many arguments does setState take and why is it async.

It takes 2 arguments. The previous state and props.
setState is asynchronous to prevent the browser from freezing during expensive state updates and to provide a better user experience generally.

##### 9. List the steps needed to migrate a Class to Function Component.

- Change component definition from class to function
- Get rid of the constructor
- Remove the render() method and keep the return.
- Declare intial state declarations with "useState".
- Update all state variables with the state setter used while defining useState.
- Convert all internal methods to functions.
- Remove all references to 'this' or any 'this' binding.
- Replace all lifecycle methods (like componentDidMount) with useEffect.
- Instead of componentWillUnMount, use a cleanup function in useEffect.

##### 10. List a few ways styles can be used with components.

- Inline CSS on elements using the style prop.
- Regular CSS files imported into the Component.
- CSS Modules to solve the problems of css class conflicts in large projects.
- Sass & SCSS (CSS pre-processors that can be installed and configured in your app).
- JSS using react-jss OR other popular CSS Libraries/Frameworks like: Styled Components, Emotion, Tailwind etc.
- Component Libraries like Material UI, React Bootstrap, Semantic UI

##### 11. How to render an HTML string coming from the server.

By using "dangerouslySetInnerHTML". This allows react to render the html elements properly. However, it's important to purify the string before rendering to prevent XSS attacks. We can use HTML Sanitizers ike DOMPurify for this.
