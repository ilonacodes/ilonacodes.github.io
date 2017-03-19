+++
tags = ["javascript", "react", "redux", "react-router"]
draft = false
date = "2017-03-19T19:25:05+01:00"
scripts = []
css = []
highlight = true
title = "Clear Form in Redux when Navigating with React-Router"
description = "I have worked on my project using a React-Redux architecture with React-Router for navigation. I have implemented forms for adding and editing resources. I have observed weird behavior..."

+++

Hi there!

I have worked on my project using a React-Redux architecture with React-Router for navigation. I have implemented forms for adding and editing resources. I have observed weird behavior:

1. Add new resource with a description: "Hello World!"
2. Start editing another resource with a description: "My new comment..."
3. Input for description contains a previous value: "Hello World!"

I was expecting to see the current description of the resource: "My new comment...", not the value from the previous form.

In my case, I was handling the state of the current form by using the same reducer:

```javascript
// Change form action
export const changeForm = (name, value) => {
  let change = {};
  change[name] = value;
  return {
    type: "FORM_CHANGE",
    change
  }
};

// form reducer
export const form = (state = {}, action) => {
  switch (action.type) {
    case "FORM_CHANGE":
      return {
          ...state,
          ...action.change
      }

    default:
        return state;
  }
};
```

I would like to share the solution that worked for me, my dear reader.

## Clear State of the Form on Every Navigation

First of all,  we need to create a new action "ROUTER.CHANGE" in the routes for handling router change:

```javascript
export const ROUTER = {
  CHANGE: "ROUTER_CHANGE"
};

export const changeRouter = (change) => ({
  type: ROUTER.CHANGE,
  change
});
```

Secondly, we should dispatch this action whenever the user navigates somewhere:

```javascript
hashHistory.listen(change => store.dispatch(changeRouter(change)));
```

The next step is to add a new case "ROUTER.CHANGE" in the form reducer and clean up the current state, by returning an empty object:

```javascript
// form reducer
export const form = (state = {}, action) => {
  switch (action.type) {
    case "FORM_CHANGE": ...

    case ROUTER.CHANGE:
       return {};

    default: ...
  }
};
```

## Conclusion

Now the form state clears itself on every navigation. You can find the whole code change [here](https://github.com/ilonade/bookshelf/commit/f961552b2e0a35dcfd6a6b01e52b2b847cae7fa2).

Thank you for reading!
