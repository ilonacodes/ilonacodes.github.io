+++
css = []
highlight = true
date = "2018-12-10T18:40:05+01:00"
cover = "/blog/images/fetching.jpeg"
title = "Fetching GitHub User with REST API and ReactJS"
tags = ["app", "React", "JavaScript", "GitHub", "API"]
draft = false
scripts = []
description = "In this post, I explain how you can find any user on GitHub through GitHub API using ReactJS, Redux, Saga, Axios, and Formik."
+++

{{< figure src="/blog/images/fetching.jpeg" title="source: https://bit.ly/2rv4HpO" >}}
In this post, I explain how you can find any user on GitHub through GitHub API using ReactJS, Redux, Saga, Axios, and Formik.

Why do we need to use this technology stack? Here is the short description:

<!--more-->

- [ReactJS](https://reactjs.org/) to build user interfaces;
- [Redux](https://redux.js.org/) to manage the state of the app;
- [Saga](https://redux-saga.js.org/) to handle async actions;
- [Axios](https://github.com/axios/axios) to send requests and receive responses from the REST API;
- [Formik](https://jaredpalmer.com/formik/docs/overview) to control and validate (with Yup) DOM-forms easier.

Let’s create a new ReactJS app with [create-react-app](https://facebook.github.io/create-react-app/docs/getting-started) and then inside the project directory in the terminal install the following [npm](https://www.npmjs.com/) packages:

```
npm install axios formik react-redux redux redux-saga yup
```
And now let’s start the app implementation 🚀

#### User-Scenario:

```
As the user,
I want to search for a specific user from GitHub,
So that I can get detailed information about the user.
When I input the username into the search field,
And I press Enter or click on the "Submit" button,
Then I see the detailed user data from Github.
```

#### Step 1
In **src** directory create a new file called **actions.js**. Here we have to write actions that would be dispatched to the redux store:

```javascript
// actions.js

export const t = {
    LOAD_USER_DATA: 'LOAD_USER_DATA',
    LOAD_USER_DATA_SUCCESS: 'LOAD_USER_DATA_SUCCESS'
};

export const actions = ({
    loadUserData: name => ({
        type: t.LOAD_USER_DATA,
        name
    }),

    loadUserDataSuccess: data => ({
        type: t.LOAD_USER_DATA_SUCCESS,
        data
    })
});
```

#### Step 2
Here we want to create a saga, that will initiate an API call for user data through the entered specific username, then tell the store whether that API call was a success.

When successful, the user data will be received and dispatched **‘LOAD_USER_DATA_SUCCESS’** along with the retrieved data.

We’ll use axios to make API requests because it is more ergonomic and straightforward when working with REST APIs (comparing to, e.g., fetch).

Let’s create a new file called **saga.js** and put the code into it:

```javascript
// saga.js

import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects'
import {actions, t} from './actions';

// the base URL for your REST API backend
const baseUrl = 'https://api.github.com/users';

// sending request with username and getting user data from GitHub
function* loadUserData(action) {
    const response = yield axios.get(`${baseUrl}/${action.name}`);
    yield put(actions.loadUserDataSuccess(response.data))
}

// watches for actions dispatched to the store and starts loadUserData saga
export function* watchLoadUserData() {
    yield takeLatest(t.LOAD_USER_DATA, loadUserData)
}
```

The **function*** creates a particular function called generator that remember the state of the function over time.

Any async step is represented through **yield** function like ‘await’ function.

#### Step 3
As soon as we started working with Redux and Redux-Saga we need to store the whole state tree of the app, so we declare the **store** variable in the root **index.js** file:

```javascript
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {userReducer} from './reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import {watchLoadUserData} from './sagas';

// initializing saga middleware for the store
const sagaMiddleware = createSagaMiddleware();

// creating the store with our reducer
const store = createStore(combineReducers({
    user: userReducer
}), applyMiddleware(sagaMiddleware));

// triggering watchLoadUserData when there is a LOAD_USER_DATA
sagaMiddleware.run(watchLoadUserData);

// wrapping the App in a Provider to work with React and Redux
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
```

#### Step 4
We have already passed the **userReducer** to the store. Now it’s time to create it. The reducer will listen to actions and handle them:

```javascript
// reducer.js

import {t} from './actions';

// starting with no data
const initState = {
    user: null
};

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        // tells the store that the user data is successfully retreived
        // and no longer in the process of fetching another one on user request.
        case t.LOAD_USER_DATA_SUCCESS:
            return {
                ...state,
                user: action.data
            };

        default:
            return state;
    }
};
```

#### Step 5
Finally, we can create class component `<Dashboard />` to use `<Formik />` to render the form, validate the user input, handle Formik props inside the DOM-elements and render the output from the user request by the username from GitHub:

```javascript
// Dashboard.js

import React from 'react';
import {Formik} from 'formik';
import './dashboard.css';
import * as Yup from 'yup';
import {actions} from './actions';
import {connect} from 'react-redux';

class DashboardComponent extends React.Component {

    render() {
        return (
            <div>
                <Formik
                    // accepts the initial object with the 'name' field that is empty
                    initialValues={{name: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        // after submitting disatches 'loadUserData' with entered username to saga
                        // to trigger the API request
                        this.props.loadUserData(values.name);
                        setSubmitting(false);
                    }}
                    // validating the input which should be a text and required
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('Required')
                    })}
                >
                    // Passing Formik props to the DOM-form-elements
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name"><b>GitHub Name</b></label>
                                <input
                                    id="name"
                                    placeholder="Enter your username"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    // In case, if the user didn't input the data to the search field
                                    // then the border of the field would be red
                                    className={errors.name && touched.name ? 'error' : ''}
                                />
                                // and the user will see the error message
                                {errors.name && errors.touched && <div className="input-feedback">{errors.name}</div>}
                                // By clicking on the "Reset" button the user will reset the form
                                <button
                                    type="button"
                                    className="outline"
                                    onClick={handleReset}
                                    disabled={!dirty || isSubmitting}
                                >
                                    Reset
                                </button>
                                // by submitting will be awating for the requested user data
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </form>
                        );
                    }}
                </Formik>
                // the response from backend will be rendered in div-element and JSON-like format
                <div className="output">
                    {JSON.stringify(this.props.user, null, 2)}
                </div>
            </div>
        );
    }
}

// making the most current state of 'user' available as props in the component
const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

// creating a function called 'loadUserData'
// that dispatches a 'LOAD_USER_DATA' action to the store
// so that saga can trigger and start the API request
const mapDispatchToProps = (dispatch) => {
    return {
        loadUserData: name => dispatch(actions.loadUserData(name))
    };
};

// connect the Dashboard component and export it for use in <App />
export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
```

#### Step 6
The last thing we have to do is to import the `<Dashboard />` component to the `<App />` component:

```javascript
// App.js

import React, { Component } from 'react';
import './App.css';
import {Dashboard} from './Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Dashboard />
        </header>
      </div>
    );
  }
}

export default App;
```

And then check whether everything works correctly by running the localhost server inside the project directory in the terminal:

```
npm start
```

After a successful compilation and requesting the user from the GitHub database, we should see the following result:

{{< figure src="/blog/images/fetching-result.png" >}}

CSS-styles you can find in CSS-files of the [project](https://github.com/ilonacodes/github-user-data).

I hope, throughout this process, you have learned how to use Formik with ReactJS, connect Redux to the app, make API calls through axios and handle async actions with Redux-Saga.

Thank you for reading! 👏

I hope you enjoyed and found the post helpful and useful.
Have any questions? Reach out to me through my [website](http://www.ilonacodes.com/) or via social networks on [Twitter](https://twitter.com/ilonacodes) or [Instagram](https://www.instagram.com/ilonacodes/).

This post was originally published on [Medium](https://medium.com/@ilonacodes/fetching-github-user-with-rest-api-and-reactjs-f163739f300b).

Have a great start into the week!

Cheers,
ilonacodes
