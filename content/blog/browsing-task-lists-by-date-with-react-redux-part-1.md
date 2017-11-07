+++
css = []
highlight = true
date = "2017-11-07T21:10:05+01:00"
title = "Browsing task lists by date with React+Redux. Part 1."
tags = ["react", "reactjs", "redux", "learntocode", "beginners", "coding", "letsgetcoding", "user", "date"]
draft = false
scripts = []
description = "Last weeks I was a little bit busy with attending the tech events (some of them I have already spotlighted in previous posts), and unfortunately didn't have enough time to write a new post about React+Redux..."
+++

Hi, there!

Last weeks I was a little bit busy with attending the tech events (some of them I have already spotlighted in previous posts), and unfortunately didn't have enough time to write a new post about React+Redux...

However, today I am going to continue the tutorial series [how to develop an interactive ToDo List with React+Redux](http://www.ilonacodes.com/blog/react-for-very-very-beginners/).

We can already create a task by tag, complete that by crossing out and even added the dynamic progress bar to follow the flow of completed or uncompleted tasks. Just to remind, we stopped [here](http://www.ilonacodes.com/blog/persisting-data-using-local-storage-react-redux/).

As I mentioned on the [Instagram profile](https://www.instagram.com/ilonacodes/) and [Twitter](https://twitter.com/ilonacodes), we will focus on handling dates, comparing them and serializing them (saving to and loading from local storage).

Let's get started!

Come back into the `my-daily-todos` folder, and open the project in your favorite text editor.

Yeah, it's been a long time here. So, just in case, take a look at the code base and try to remember why we need actions, reducers, components, etc. I recommend you also to run the app on a local server via `npm start` command in the terminal to see your current development progress.

Afterwards, get back to the code and keep on coding using the next instructions:

To be able toggling task lists by dates and, we have to do the following:

1. Create two new  `goToPreviousDay` and `goToNextDay` actions in `actions.js`:

    ```javascript

    // src/Tasks/actions.js

    export const t = {
      ...
      GO_TO_PREVIOUS_DAY: 'GO_TO_PREVIOUS_DAY',
      GO_TO_NEXT_DAY: 'GO_TO_NEXT_DAY',
    }

    ...

      goToPreviousDay: () => ({
        type: t.GO_TO_PREVIOUS_DAY,
      }),

      goToNextDay: () => ({
        type: t.GO_TO_NEXT_DAY,
      }),
    }

    ```  

2.  Go to the `reducers.js`, write a new reducer `dateReducer` and "add the logic" to this reducer using the above-created actions:

    ```javascript

    // src/Tasks/reducers.js

    ...

    function generateID () {
      return '_' + Math.random().toString(36).substr(2,9);
    }

    // a new initial State is a date object
    export const dateReducer = (state = new Date(), action) => {

      // store the value of current date in copiedDate variable
      let copiedDate = new Date(state.valueOf());

      switch (action.type) {
        case t.GO_TO_PREVIOUS_DAY:
         // this action case passes on the previous date
          copiedDate.setDate(copiedDate.getDate()-1);
          return copiedDate;

        case t.GO_TO_NEXT_DAY:
       // this action case passes on the previous date
          copiedDate.setDate(copiedDate.getDate()+1);
          return copiedDate;

        default:
          return state;
      }
    }

    ...

    ```

3.  To render and present a date feature we are going to the `TasksList.js` component:

    ```javascript

    // src/Tasks/TasksList.js

    ...

    // create an array of months
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "July", "August", "September", "October", "November", "December"];

    // create a function that will format a date to "DD Month YYYY"
    function formatDate(date) {
      let day = date.getDate();
      let monthIndex = date.getMonth();
      let year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    // there are new props currentDate, goToPreviousDay, goToNextDay
    export const TasksListComponent = ({tasks, completeTask, currentDate, goToPreviousDay, goToNextDay}) => {
      const categories = unique(tasks.map(task => task.tag))

      return <div className="taskslist-container">

     // add two links and formatted currentDate property to div-container to make it visible in the browser
        <div>
          <a href="#" onClick={goToPreviousDay}>Prev</a>
          {formatDate(currentDate)}
          <a href="#" onClick={goToNextDay}>Next</a>
        </div>

       ...

    const mapStateToProps = (state) => {
      return {
        tasks: state.tasks,
        // currentDate state connect to store
        currentDate: state.currentDate
      }
    }


    const mapDispatchToProps = (dispatch) => {
      return {
        completeTask: (id) => dispatch(actions.completeTask(id)),
      // dispatch new actions
        goToPreviousDay: () => dispatch(actions.goToPreviousDay()),
        goToNextDay: () => dispatch(actions.goToNextDay()),
      }
    }

    export const TasksList = connect(
      mapStateToProps,
      mapDispatchToProps,
    )(TasksListComponent);

    ```

4.  The next step is to import the new `dateReducer` to `index.js` and `currentDate` assign to it:

    ```javascript

    // src/index.js

    import { createStore, combineReducers } from 'redux';

      import { App } from './App.js';

      // import the dateReducer
      import { tasksReducer, dateReducer } from './Tasks/reducers.js';
      import './index.css';

      let initState = {}
      let store = createStore(
        combineReducers({
          tasks: tasksReducer,
         // assing dateReducer to currentDate
          currentDate: dateReducer,
        }),
        initState
      );

      store.subscribe(() => {
        let state = store.getState()
        localStorage.setItem('reduxState', JSON.stringify({
          ...state,
         // add a new currentDate as undefined to a new property
          currentDate: undefined,
        }))
      })

    ...

    ```

    <span style="color:red">We have to store the current date as undefined so that the user sees “today” date every time they reload the application. Essentially, we don’t want to persist what is the current date.</span>

That's it for today. Now we can see the current day on the dashboard of the app and change the date by clicking on the `Previous Date` and `Next Date`.

In the next blog post, I will tell you how to use a date as a calendar day by removing hours, minutes, seconds and milliseconds on every date creation, filter all tasks by the current date before categorizing them, and make date-bar looks good.

I hope you enjoyed reading the post and got to know new useful information about the managing dates with React+Redux.
