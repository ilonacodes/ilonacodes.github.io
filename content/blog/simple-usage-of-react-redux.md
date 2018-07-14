+++
css = []
highlight = true
date = "2017-09-17T20:00:05+01:00"
title = "Simple Usage of React+Redux"
tags = ["react", "reactjs", "redux", "learntocode", "beginners", "coding", "letsgetcoding"]
draft = false
scripts = []
description = "Let me introduce React+Redux co-working through the simple input change that should render \"Hello, {any name / text}!\" at the end and manage by redux states."
+++

As I promised in [my previous post](/blog/react-for-very-very-beginners/), today I am going to tell you about Redux, why and how we need to use them in common.
Let me introduce React+Redux co-working through the simple input change that should render `Hello, {any name / text}!` at the end and manage by redux states.

Redux? What is it?
Redux is a predictable state container for managing both UI-state and data-state in JavaScript applications. It helps you create applications that behave consistently and run in different environments like client, server, and native. To add Redux dependencies to your application type and run in a command line:

```
npm install --save redux
npm install --save react-redux
npm install --save-dev redux-devtools
```

You can read more about that [here](http://redux.js.org/).

Let's come back to the `my-daily-todos` directory in the `workspace` that we set up in my previous post and change into `my-daily-todos/src/index.js` file.

<span style="color:red">It's not a good style to write all code parts in one file, and I do that only for this example.</span>

I recommend you to remove all code inside and just replace that with:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Hello = () => {
  return <div>
    <input type='text' />
    <p>Hello, World!</p>
  </div>
}

ReactDOM.render(<Hello />,
  document.getElementById('root')
);
```

As you noticed, now we are going to render the `Hello` component in the browser.

<span style="color:red">Don't forget run local server on your computer from the `my-daily-todos` directory using `npm start` in the command line.</span>

What you should see in the browser is an input field and the simple message `Hello, World!`.

Now I am going to add some props to our code, which could make you confused, but don't worry I will explain that below:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import './index.css';

const HelloComponent = ({name, updateName}) => {
  return <div>
    <input type='text'
           value={name}
           onChange={e => updateName(e.target.value)}
    />
    <p>Hello, World!</p>
  </div>
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const Hello = connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloComponent);

ReactDOM.render(
  <Provider>
    <Hello />
  </Provider>,
  document.getElementById('root')
);
```

Yeah, it doesn't render anymore, does it? ;) First of all, you see some values inside the `Hello` component and don't have any idea from where they come. Secondly, you noticed three new constants `mapStateToProps`,  `mapDispatchToProps` and `Hello`. As you guess, the last one connects two previous via `HelloComponent` connector and all these elements with all props should be rendering in "Hello" component via `Provider` component. That is where Redux comes in: `mapStateToProps` allows to read any application state, and `mapDispatchToProps` allows to dispatch state changes.
Right now, the logical question: "Where should it manage state and dispatch actions?"

The answer is into the store:

```javascript
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// ...

const Hello = connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloComponent);

let store = createStore(
  combineReducers({}),
);

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root')
);
```

We created a store variable using `createStore` function to create a store and combineReducers function to add reducers (we will speak about that a bit later).

<span style="color:red">Notice! All components and functions that belong to React and Redux must be imported at the beginning of the file.</span>

Finally, it renders correctly in the browser, and still, nothing changed. As I mentioned above, we need to add a reducer, but I would like to start from the action creating:

```javascript
// ...

const Hello = connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloComponent);

/* Action */
// create action type
const UPDATE_NAME = 'UPDATE_NAME'

// action creators
function updateName(name) {
  return { type: UPDATE_NAME, name }
}

// ...
```

We are using the action to send data from the application to the store via dispatch function that notifies store about the current state that the store gets from the reducer:

```javascript
/* Reducer */

//create an initial state with empty name as a value
const initState = { name: '' }

// create a reducer
const greetingReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      return Object.assign({}, state, {
        name: action.name
      })

    default:
      return state;
  }
}

```

These are action cases that are responsible for the defined behavior for the dispatched action. In our case, our goal is to update the name by input = change the input value and see results on the screen in the browser. After creating the reducer, we have to combine it via `combineReducers` in the store and give it a name to use:

```javascript
// ...

let store = createStore(
  combineReducers({
    greeting: greetingReducer
  }),
);

//...
```

Finally, we are ready to provide all states and all actions (for this feature we have only one state and one action) adding them to
`mapStateToProps` and `mapDispatchToProps`:

```javascript
const mapStateToProps = (state) => {
  return {
    name: state.greeting.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateName: (name) => dispatch(updateName(name))
  }
}
```

And all these props are already used in `HelloComponent`. Just check this component and find them.

The last step is to make things work properly and see the results on the screen in the browser. So, we have to add `{name}` property instead of the "World" inside the "Hello, World!":

```javascript
const HelloComponent = ({name, updateName}) => {
  return <div>
    <input type='text'
           value={name}
           onChange={e => updateName(e.target.value)}
    />
    <p>Hello, {name}!</p>
  </div>
}
```

That's it. It should work. If you have any questions, you can reach me through the [email](mailto:demiluri@gmail.com) or in direct messages on [Instagram](https://www.instagram.com/ilonacodes/).

The whole code is below:

``` javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import './index.css';

/* Component */
const HelloComponent = ({name, updateName}) => {
  return <div>
    <input type='text'
           value={name}
           onChange={e => updateName(e.target.value)}
    />
    <p>Hello, {name}!</p>
  </div>
}

const mapStateToProps = (state) => {
  return {
    name: state.greeting.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateName: (name) => dispatch(updateName(name))
  }
}

const Hello = connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloComponent);

/* Action */
const UPDATE_NAME = 'UPDATE_NAME'

function updateName(name) {
  return { type: UPDATE_NAME, name }
}

/* Reducer */
const initState = { name: '' }

const greetingReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      return Object.assign({}, state, {
        name: action.name
      })

    default:
      return state;
  }
}

/* store */
let store = createStore(
  combineReducers({
    greeting: greetingReducer
  }),
);

/* Provider using store */
ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root')
);

```

In the next post, we will start writing an interactive TODO list with user stories step by step using React+Redux technologies stack.

Thank you for reading! Happily, you got the basic idea of React+Redux "co-working" and became ready to start your journey within.
