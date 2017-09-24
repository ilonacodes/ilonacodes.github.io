+++
css = []
highlight = true
date = "2017-09-26T19:30:05+01:00"
title = "Let's complete some tasks with React+Redux"
tags = ["react", "reactjs", "redux", "learntocode", "beginners", "coding", "letsgetcoding", "user", "userstory"]
draft = true
scripts = []
description = "As you guess from the blog title, the next feature called `Complete a task`.  So, let's begin!"
+++

Today we are going to implement the second feature for our app. If you are a new reader, then I highly recommend you to check my earlier blog posts [here](http://www.ilonacodes.com/blog/react-for-very-very-beginners/), where we started our learning journey in React+Redux, refer to the posts complete previous steps and continue with us to develop an interactive ToDo List from here.

As you guess from the blog title, the next feature called `Complete a task`.  So, let's begin! At first, we start writing the next user story, and it will look like:

```
As Bob
I want to complete the task
So that I can keep track of what is completed and what is not

## Acceptance Criteria:

Given a task list
And every task is listed
And I am on a dashboard screen
When I complete a task from the list
And click on this chosen task
Then I see the task is crossed out

```

Now you got the idea how it should work. Let's start to implement the new feature and come back to our project `my-daily-todos` directory changing into `Task.js` component, where we will add a new action `completeTask` to the `onClick `function:

```javascript

// my-daily-todos/src/Tasks/Task.js

import React from 'react';

export const Task = ({task, completeTask}) => {
  return <div onClick={e => completeTask(task.id)}>
    {task.title}
  </div>
}

```

Afterwards, we have to dispatch the action to the store with states, that's why now we are changing into `TaskList.js` and add the action `completeTask` to `mapDispatchToProps` passing to `Task.js` component inside the `TaskListComponent`:

```javascript

// my-daily-todos/src/Tasks/TaskList.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Task } from './Task.js';
import { actions } from './actions';

const TaskListComponent = ({tasks, completeTask}) => {
  return <div className="tasklist-container">
    <ul>
      {tasks.map(task =>
        <li key={task.id}>

          // pass the "completeTask" action to "Task" component
          <Task task={task} completeTask={completeTask} />
        </li>
      )}
    </ul>
  </div>
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    // dispatch the "completeTask" function with "id" parameter as an action to store of states
    completeTask: (id) => dispatch(actions.completeTask(id))
  }
}

export const TaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListComponent);

```

As you will take a look at the `actions.js` file, then you will have noticed that we still don't have the `completeTask` action. Let's create one into the `actions.js` file:

```javascript

// my-daily-todos/src/Tasks/actions.js

export const t = {
  ADD_TASK: 'ADD_TASK',
  COMPLETE_TASK: 'COMPLETE_TASK'
}

export const actions = {
  addTask: title => ({
    type: t.ADD_TASK,
    title
  }),

// create a new action function "completeTask" passing "id" as a parameter
  completeTask: id => ({
    type: t.COMPLETE_TASK,
    id
  }),
}

```
Good job! The next step is to pass the action created above to our `tasksReducer`. Switch to `reducers.js` file and add a new case `t.COMPLETE_TASK` to the reducer:

```javascript

// my-daily-todos/src/Tasks/reducers.js

import { t } from './actions';

const initState = []

function generateID () {
  return '_' + Math.random().toString(36).substr(2,9);
}

export const tasksReducer = (state = initState, action) => {

  switch (action.type) {
    case t.ADD_TASK:
      return [
        ...state,
        {
          id: generateID(),
          title: action.title
        }
      ]

// add the new case that returns the task list
    case t.COMPLETE_TASK:
      return state.map(task => {
// if the task is the one that is clicked by the user
        if (task.id === action.id) {
// then assign to a new property "completed" the "true" value
          return { ...task, completed: true }
        } else {
// otherwise, return the task object
          return task
        }
      })

    default:
      return state;
  }
}

```

You are right! From now there are already three properties (id, title and completed) that belong to the `task` object. To use the completed property, we are going to `Task.js` component and write the `if-statement`: if `task.completed` is `true` then we assign the `.completed` class name style to this task:

```javascript

// my-daily-todos/src/Tasks/Task.js

import React from 'react';

export const Task = ({task, completeTask}) => {

// add the "if-statement"
  return <div className={`${task.completed ? 'completed' : ''}`} onClick={e => completeTask(task.id)}>
    {task.title}
  </div>
}

```

Lastly, we have to add `line-through` style to `.completed` class into `App.css`, because we want to mark the completed task by crossing out that:

```css
// my-daily-todos/src/App.css

...
.tasklist-container ul li .completed{
  text-decoration: line-through;
}

```

The results of creating tasks and completing tasks are shown below:

![Add tasks:](/blog/images/add-tasks.png)

![Complete tasks:](/blog/images/complete-tasks.png)

Congratulations! You finished the second feature for our app. To watch how it works in the browser, just run the localhost server by typing `npm start` in your terminal inside the `my-daily-todos` folder.

Thank you for the reading. I hope you find useful the React+Redux tutorial series!
