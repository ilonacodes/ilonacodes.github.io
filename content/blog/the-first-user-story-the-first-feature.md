+++
css = []
highlight = true
date = "2017-09-21T19:30:05+01:00"
title = "The First User Story, The First Feature With React+Redux"
tags = ["react", "reactjs", "redux", "learntocode", "beginners", "coding", "letsgetcoding", "user", "userstory"]
draft = false
scripts = []
description = "I guess you are pretty encouraged to start coding our app. Just to remind: it will be an interactive daily ToDo List."
+++

Hi, everyone! I guess you are pretty encouraged to start coding our app. Just to remind: it will be an interactive daily ToDo List. Today I am going to explain: what is a user story? Why do we need to write it before implementing a feature? How will we organize and structure an app? What is, actually, a new feature?

Let's start with the first question. In my opinion, user stories are efficient things. To be more precise, we begin to write them from the perspective of the user and describe them in a very simple way with traditional structure. How it works:

```
As a (name of the user)
I want to (some actions or feature)
so that/because (reason and value for the user)
```

It's possible to add some acceptance criteria to user stories that will indicate what should happen, driven by context and other situations.
In our case, the user story for the first feature will look like:

```javascript
As Bob
I want to add a new task.
So that I remember what I should do today

## Acceptance Criteria:

Given there are no tasks
And I (Bob) am on the dashboard screen
When I input a new task title
And press enter
Then I see the task on the dashboard screen
```

I guess, now you got an idea what the kind of functionality contains the first feature. I recommend writing user stories to understand clearly what the result we want to get and how it should work in the end.

Coming back to our app, I want you to change into the directory `my-daily-todos` and there remove the whole code from the `index.js`, because now we are going to structure an app:

1. Create a new folder `Tasks` into `src`.
There we will store all our files for the task feature.

2. Add new files `actions.js`, `reducers.js`, `NewTask.js`, `Task.js`, `TaskList.js` into `Tasks` folder.
As you know, `actions.js` and `reducers.js` we need for handling states, state changes, and actions. `NewTask.js` will contain the component with the input form for a new task and will belong to the navigation bar. `Task.js` is a component that presents the `task` object with `id` and `title` properties. `TaskList` is a component that presents all the tasks we have created and will appear as the rest of the "body" of the page.

<span style="color:red">Notice! We still use `index.js` to render the whole app `App.js` in the browser; `App.js` to connect `NewTask.js` and `TaskList.js`, and `App.css` to make a basic design for our app.</span>

3...2...1... And now. Finally, let's start coding!
To refer to the app structure, I advise you to start developing with the components and then add redux functionalities and properties such as actions and reducers with states. As I mentioned above, at the beginning I write the `NewTask.js` component, so switch to there and begin your coding journey. I added some comment to make it easy to understand the basic principle how it works. Now you see what we have here:

```javascript
// my-daily-todos/src/Tasks/NewTask.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions } from './actions';

// here we create a component that will connect to NewTask component

const NewTaskComponent = ({addTask}) => {

// this function is in charge of handling Enter key on a new task submit

function handleKeyPress (e) {
  if (e.key === 'Enter') {
    addTask(e.target.value);
    e.target.value = '';      // make an input field empty after pressing Enter
    e.preventDefault();
  }
}

// what UI component contains
  return <div>
    <input
      type='text'
      placeholder='Add a new task...'
      onKeyPress={handleKeyPress}
    />
  </div>
}

const mapStateToProps = (state) => {
  return {

  }
}

// which actions dispatch to reducer
const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (title) => dispatch(actions.addTask(title))
  }
}

// export the NewTaks component to App.js
export const NewTask = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTaskComponent);

```

The next `Task.js` component renders the `task` object in the browser:

```javascript
// my-daily-todos/src/Tasks/Task.js

import React from 'react';

// the argument is a task object that return the title task
export const Task = ({task}) => {
  return <div>
    {task.title}
  </div>
}
```

We also need a component `TaskList.js` that will render all tasks that we have added/created through the input:

```javascript
// my-daily-todos/src/Tasks/TaskList.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Task component
import { Task } from './Task.js';

const TaskListComponent = ({tasks}) => {
  return <div>
    <ul>
 // create a dynamic task list with javascript inside html and pass properties to the Task component
      {tasks.map(task =>
        <li>
          // key={.. something unique ..} is important when rendering lists in react
          <Task key={task.id} task={task} />
        </li>
      )}
    </ul>
  </div>
}

// collect the tasks state that would be passing to the store of states
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

// export the TaskList component to App.js
export const TaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListComponent);

```

We still should make a couple of steps to make our app work. Also, the next step is to write action `addTask` to `actions.js`:

```javascript
// my-daily-todos/src/Tasks/actions.js

// create t const to define a list actions
export const t = {
  ADD_TASK: 'ADD_TASK'
}

// export actions with addTask action creator passing title as argument to component NewTask.js and reducers

export const actions = {
  addTask: title => ({
    type: t.ADD_TASK,
    title
  })
}

```

Good job! As you noticed, we still don't have any reducer. That's why we open `reducers.js` file and write a reducer:

``` javascript
// my-daily-todos/src/Tasks/reducers.js

import { t } from './actions';

// create initial state. In our case, it is an empty list of tasks
const initState = []

// create a function that generates ID for every task randomly
function generateID () {
  return '_' + Math.random().toString(36).substr(2,9);
}

// create tasksReducer with state as initState and action as arguments

export const tasksReducer = (state = initState, action) => {

  switch (action.type) {

// the ADD_TASK action has to return all previous state and a new task with generated ID and typed title

    case t.ADD_TASK:
      return [
        ...state,
        {
          id: generateID(),
          title: action.title
        }
      ]

// otherwise, return just previous state that is initState
    default:
      return state;
  }
}

```

To store and to change states, it's necessary to have a store with reducers and provide that states to render in the browser. All of that we should apply into `index.js`:

```javascript
// my-daily-todos/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// all custom imports
import './index.css';
import { App } from './App.js';
import { tasksReducer } from './Tasks/reducers.js';

// create store using createStore() including combineReducers() to pass the taskReducer with name "tasks"

let store = createStore(
  combineReducers({
    tasks: tasksReducer
  }),
);

ReactDOM.render(
// apply store to store states and make them available to dispatch in components

  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

```

Finally, we can connect all above components (apart from `Task.js` that is already used inside of `TaskList.js` component) in one component - `App.js`:

```javascript
// my-daily-todos/src/App.js

import React, { Component } from 'react';

import './App.css';
// import both components
import { NewTask } from './Tasks/NewTask.js';
import { TaskList } from './Tasks/TaskList.js';

export const App = () => {
// pass both components to App.js
  return <div>
    <NewTask />
    <TaskList />
  </div>
}

```
That's it. Just change into `my-daily-todos` directory and run your local server using `npm start` command in the terminal.

If you want, to make your app fancy, then you can apply some CSS styles to classes that I assign in tags below. Just come back to `App.js` component:

```javascript
// my-daily-todos/src/App.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

// we have already imported App.css to make things look good
import './App.css';
import { NewTask } from './Tasks/NewTask.js'
import { TasksList } from './Tasks/TasksList';

export const App = () => {
// add one more div tag and assign the classes
  return <div className='container'>
      <div className='navbar'>
        <div className='logo'>
          <h1>ToDoDaily</h1>
        </div>
        <NewTask />
      </div>
      <TasksList />
    </div>
}

```

The same thing we are doing for the `TaskList.js` component. Just adding the `tasklist-container` class to the div tag after return:

```javascript
my-daily-todos/src/Tasks/TaskList.js
...
export const TasksListComponent = ({tasks, completeTask}) => {
  return <div className="taskslist-container">
    <ul>
    {tasks.map(task =>
      <li>
...

```

<span style="color:red">If you take a look at `index.js`, you will notice, that `App.js` is already imported.</span>

All that remains is to design our app. As you noticed, we have already Logo, which with input field belongs to the navigation bar according to the idea how the app will look at the end. Now we are going to App.css and style our app with simple CSS rules:

```css
/* my-daily-todos/src/App.css */

.container {
  padding: 0;
  margin: 0;
}

.navbar {
  background-color: #333;
  overflow: hidden;
  display: block;
  width: 100%;
  height: 80px;
}

.logo {
  float: left;
  color: white;
  margin-left: 2rem;
}

input {
  float: none;
  color: black;
  padding: 5px 25px;
  margin: 1.8rem;
  border-radius: 3px;
  border-width: 1px;
}

.taskslist-container {
  margin-top: 1rem;
  margin-left: 1rem;
}

.taskslist-container ul li .completed{
  text-decoration: line-through;
}

```

Now we have completed the first feature for our app and can move forward to increase the functionality of the app by adding new features using React+Redux and their dependencies.

If you still have any questions how it works or why something doesn't work for you, don't hesitate and find me via my [email](mailto:demiluri@gmail.com) or on my [Instagram profile](https://www.instagram.com/ilonacodes/).

Thank you for your reading and wish you the best luck by learning React+Redux frameworks!
