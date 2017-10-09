+++
css = []
highlight = true
date = "2017-10-10T12:30:05+01:00"
title = "Persisting data using local storage with React+Redux"
tags = ["react", "reactjs", "redux", "learntocode", "beginners", "coding", "letsgetcoding", "data", "localstorage"]
draft = true
scripts = []
description = "Today I would like to start the topic about persisting the data and restoring it after refreshing the page or starting a new session on the local machine with React+Redux."
+++

Let's continue developing an Interactive ToDo List. Refer to the [previous posts](http://www.ilonacodes.com/blog/react-for-very-very-beginners/) you notice that we are almost done with the basic functionality of the application. And today I would like to start the topic about persisting the data and restoring it after refreshing the page or starting a new session on the local machine with React+Redux.

Changing into the `my-daily-todos` project, then to `src` folder where you find `index.js`. Here we store all the app’s state in the `store` variable. Now we are also going to add a new variable that will keep the initial state and a new constant `persistedState` that allows us to get the persisted state from store passing to method `getItem` of `localStorage` => `localStorage.getItem('reduxState')`:

So, the `initState` variable has the default value – empty `{}`. If there is no persisted state in the local storage, it is going to stay empty.

On the other hand, when there is some persisted state in the local storage, we are going to load that state and set `initState` to value, that we have just loaded.

```javascript
// my-daily-todos/src/index.js

...

import { App } from './App.js';
import { tasksReducer } from './Tasks/reducers.js';
import './index.css';

let initState = {}
const persistedState = localStorage.getItem('reduxState')

// if persistedState is not empty then assign parsed persistedState to initState
if (persistedState) {
  initState = JSON.parse(persistedState)
}

...

```

<span style="color:red">Notice that we are passing the second parameter `initState` to `createStore` method in `store`. The second parameter of `createStore` function is for setting the initial state of the store when the application is launched:</span>

``` javascript
// my-daily-todos/src/index.js

...

let store = createStore(
  combineReducers({
    tasks: tasksReducer,
  }),
  initState
);

...

```

Onward!

We are going to use `subscribe` method of our `store`. That method will trigger the function we provide every time there is any change to the application state.

We are going to supply a function that will get the whole state from the store using `getState()` method of `store`. Then it is going to convert that state object to a string using `JSON.stringify()`. Finally, it is going to persist that state using `localStorage.setItem()`:

```javascript
// my-daily-todos/src/index.js

...

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

...

```

That's it.

To check how it works run the local server on your computer in the project folder with the `npm start` command. Afterwards, try to add and categorize some tasks by tags, then close the tab with the application or refresh the page to see that the data is stored successfully.

Did you find another way how to implement it in our project? Let me know by [email](mailto:demiluri@gmail.com) or write me a direct message on [Instagram](https://www.instagram.com/ilonacodes/). That is how the `index.js` should look like now:

```javascript
// my-daily-todos/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { App } from './App.js';
import { tasksReducer } from './Tasks/reducers.js';
import './index.css';

let initState = {}
const persistedState = localStorage.getItem('reduxState')
if (persistedState) {
  initState = JSON.parse(persistedState)
}

let store = createStore(
  combineReducers({
    tasks: tasksReducer,
  }),
  initState
);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

```

If you enjoyed this post, I would be very grateful if you would help me spread the word by emailing it to a friend or sharing it on social networks. Thank you!
