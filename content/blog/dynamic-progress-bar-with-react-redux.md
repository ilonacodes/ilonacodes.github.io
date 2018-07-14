+++
css = []
highlight = true
date = "2017-10-06T19:30:05+01:00"
title = "Dynamic progress bar with React+Redux"
tags = ["react", "reactjs", "redux", "learntocode", "beginners", "coding", "letsgetcoding", "user", "category", "userstory"]
draft = false
scripts = []
description = "You are going to get to know how to implement a dynamic progress bar that will handle task completing status by percentage for every category."
+++

Hi there! I am so happy that you continue developing our interactive Daily ToDo app with me. Today you are going to get to know how to implement a dynamic progress bar that will handle task completing status by percentage for every category.

<span style="color:red">But before moving on, if you are new here, please, have a look at the [previous posts](/blog/react-for-very-very-beginners/). You should start developing app there and then continue with us here.</span>

And now I would like to offer my approach how to add a simple but dynamic progress bar to every task category and finally, make our Daily ToDo app interactive.

Let's change into `my-daily-todos` folder and start developing!

Firstly, I recommend you to add a small library `w3.css` to our `index.html` where we store all style dependencies:

```html

// my-daily-todos/public/index.html

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">

// just add this library
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

<span style="color:red">If you open your `index.html` for the first time, you'll notice, that there lots of comments and some initial link tags. In this case, you can just rewrite your `index.html` in the way that I left above.</span>

The dynamic progress bar belongs to the `TaskCategory.js` component. That's why we have to open this file and step by step implement the new feature:

1. To initialize `completed_tasks` constant, that will filter `tasks` by `completed` property and store them in;

2. To initialize `percentage` constant to count the percentage of completed tasks with a simple formula and to round it with `floor` method;

3. Apply classes from the `w3.css` library for tags inside the `TaskCategory.js` component and pass the value of `percentage`;

```javascript

// my-daily-todos/src/Tasks/TaskCategory.js

...
export const TaskCategory = ({category, tasks, completeTask}) => {

// Step 1
  const completed_tasks = tasks.filter(task => task.completed);

// Step 2
  const percentage = Math.floor(completed_tasks.length / tasks.length * 100);

  return <div>
    <h2>{category}</h2>

// Step 3
      <div className="w3-light-grey w3-round progress-bar">
       <div className="w3-container w3-round w3-green progress-bar-indicator"
        style={{width: `${percentage}%`}}>
        {percentage}%
       </div>
      </div>
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

To make things look good, we should change into `App.js` and add styles to already created from the `w3.css` library `.progress-bar` and `.progress-bar-indicator` classes:

```css

// my-daily-todos/src/App.css

...

.taskslist-container .progress-bar {
   width: 30%;
   height: 25px;
   text-align: center;
   margin-bottom: 1rem;
   font-size: 11px;
 }

 .taskslist-container .progress-bar-indicator {
   height: 25px;
   padding-top: 5px;
 }

```

<span style="color:red">To check how it looks like, don't forget to run a local server by the `npm start` in the terminal in `my-daily-todos` folder.</span>

You should get something like that at the end:

![Progress bar](/blog/images/progress-bar.png)

Thank you for the reading. Happily, you are enjoying developing with React+Redux and waiting for the next feature description. Have a nice coding!
