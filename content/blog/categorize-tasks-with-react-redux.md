+++
css = []
highlight = true
date = "2017-10-01T19:30:05+01:00"
title = "Categorize tasks with React+Redux"
tags = ["react", "reactjs", "redux", "learntocode", "beginners", "coding", "letsgetcoding", "user", "category", "userstory"]
draft = false
scripts = []
description = "Today we are going to make an app more functional, separating tasks by categories."
+++

The most valuable feature set for our Daily ToDo is already done. Today we are going to make an app more functional, separating tasks by categories. We want to be able to categorize task by typing `#` and category after its title.

For example: `practice a coding kata #programming`.

As always, we start with the simple `user story` and the `acceptance criteria`:

```
As Bob
I want to categorize tasks by adding tag into input
So I see which task belongs to which category

## Acceptance Criteria

Given there are no tasks
And I am on dashboard screen
When I finish inputting a new task title
And choose the category (tag) for a task
And press Enter
Then I see the categorized task by tag on the dashboard screen

Tag examples: Programming, Sport, Languages, University, Reading, Routine
```

<span style="color:red">If you are a new reader of the tutorial series and don't understand what is going on at the moment, then just check the previous posts starting with [React For Very Very Beginners](http://www.ilonacodes.com/blog/react-for-very-very-beginners/)</span>

To add this feature,  we should extend the action `ADD_TASK` in `reducers.js` and add `tag` property to a `task` object by separating a `title` into parts:

```javascript
// my-daily-todos/src/Tasks/reducers.js

...
// As I mentioned before we will change only "ADD_TASK" action in "tasksReducer"

case t.ADD_TASK:

// split a title by "#" into two parts
      const titleParts = action.title.split('#')

// the first part is a title task, where "trim" method removes whitespace from both ends of a string
      const title = titleParts[0].trim()

// the second part is a tag
      const tag = titleParts[1]

      return [
        ...state,

// now the "task" object contains three properties: id, title, and tag
        {
          id: generateID(),
          title: title,
          tag: tag
        }
      ]
...

```

<span style="color:red">As usual, change into `my-daily-todos` folder in your `workspace` via your terminal and open the project in your favorite editor to continue implementing a new feature.</span>

The next step is to create a new component `TaskCategory.js` in `Tasks` folder that will contain and use `Task.js` component.

You heard that right, `Task.js` component is `moving` from `TaskList.js` component into `TaskCategory.js`.

Now the `TaskList.js` will include `TaskCategory.js` instead of `Task.js`. That is because we have extended the task object by a category and the `TaskList.js` component renders all tasks that have been created through the user input field:

```javascript
// my-daily-todos/src/Tasks/TaskCategory.js

import React from 'react';

// import `Task.js` component
import { Task } from './Task.js';

// add states and actions into TaskCategory.js to handle them
export const TaskCategory = ({category, tasks, completeTask}) => {
  return <div>
// the "category" will render a "tag" name and sort tasks by tags
    <h2>{category}</h2>

// take and add here this code snippet from "TaskList.js"
    <ul>
    {tasks.map(task =>
      <li key={task.id}>
        <Task task={task} completeTask={completeTask} />
      </li>
    )}
    </ul>
  </div>
}
```

The last changes what we have to do:

1. To pass the `TaskCategory.js` component into the `TaskList.js` component;

2. To write `unique` function to categorize created tasks without any task duplication in a category;

3. To filter tasks by a `tag` that is equal to a `category`.

To make all things work, open the `TaskList.js` component and rewrite a little bit of code there:

```javascript
// my-daily-todos/src/Tasks/TaskList.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

// import "TaskCategory.js" component
import { TaskCategory } from './TaskCategory.js';

import { Task } from './Task.js';
import { actions } from './actions';

// create the "unique" method that will take "array" as an argument, remove duplicate values from an array, and return a new array
const unique = array => {
  return array.filter((item, index) => {
    return array.indexOf(item) === index
  })
}

const TaskListComponent = ({tasks, completeTask}) => {

// apply the "unique" function for the categories array
  const categories = unique(tasks.map(task => task.tag))

  return <div className="tasklist-container">
// make a list for every of user category and pass the "TaskCategory.js" component here
    {categories.map(category =>
      <TaskCategory
        key={category}
        category={category}
        completeTask={completeTask}

// filter array of tasks that will manage by a tag to a category
        tasks = {tasks.filter(task => task.tag === category)}
      />
    )}
  </div>
}
...

```

The result in the case of the categorize tasks is shown here:

![Read a book](/blog/images/read-a-book-category.png)
![Do yoga](/blog/images/do-yoga-category.png)
![Categories](/blog/images/categories.png)

Before moving on, I hope you enjoyed and understand how to categorize tasks with `React+Redux` and ready to the next challenge (new feature) for our interactive Daily ToDo app.

Thank you for the reading. If you have any questions or suggestions how it should have written on, then just get in touch with me either per [email](mailto:demiluri@gmail.com) or on my [Instagram profile](https://www.instagram.com/ilonacodes/).
