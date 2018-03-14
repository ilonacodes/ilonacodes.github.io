+++
css = []
highlight = true
date = "2018-03-14T15:30:05+01:00"
title = "Front-end Shorts: Setting up React-Router-Redux"
tags = ["react", "redux", "react-router-redux", "javascript", "frontend", "learntocode", "coding", "letsgetcoding", "womenwhocode"]
draft = false
scripts = []
description = "Yesterday I worked with the web application written on React + Redux and had had some problem with the react-router-redux library. In short, the push method (using for navigation outside of components) didn't work."
+++

Hi, everyone! How is your week going?

Yesterday I worked with the web application written on React + Redux and had had some problem with the `react-router-redux` library. In short, the `push` method (using for navigation outside of components) didn't work.

Firstly, I have tried to set the Route component in the "traditional" way such as with react-router library. That might get the history props. Unfortunately, that also didn't work.
Because of Redux framework.

After spending time on the Internet, I found the issue how to navigate events via Redux actions: I missed routerMiddleware as the second parameter for my store:

```javascript
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {browserHistory} from 'react-router';
import {routerMiddleware, routerReducer, syncHistoryWithStore} from 'react-router-redux';

import {Routes} from './components/Routes';
import {expenseFormReducer, expensesReducer} from './reducers/expensesReducer';

import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    combineReducers({
        routing: routerReducer,
        expenses: expensesReducer,
        expenseForm: expenseFormReducer
    }),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(browserHistory)
        )
    ),
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Routes history={history} store={store}/>,
    document.getElementById('root')
);

```

After applying that all routes to different component work correctly.

Thank you for the reading. If you have any questions or suggestions how it should have written on, then just get in touch with me either on my [Twitter](https://twitter.com/ilonacodes) or [Instagram](https://www.instagram.com/ilonacodes) profiles.
