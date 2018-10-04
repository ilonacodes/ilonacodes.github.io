+++
css = []
highlight = true
date = "2018-10-02T10:40:05+01:00"
cover = "/blog/simple-state-machine-with-redux.jpeg"
title = "Simple State Machine with Redux"
tags = ["data", "react", "javascript", "redux", "tech"]
draft = false
scripts = []
description = "The last days I am working on the project, which should include the state machine. Implementing this project with React, I decided to use the Redux framework to manage state in my React application. Moreover, thanks to redux store we can debug data (in one place) easily."
+++

{{< figure src="/blog/simple-state-machine-with-redux.jpeg" title="https://bit.ly/2wIeeNU" >}}

The last days I am working on the project, which should include the state machine. Implementing this project with React, I decided to use the Redux framework to manage state in my React application. Moreover, thanks to redux store we can debug data (in one place) easily.

<!--more-->

At first, I thought how to structure the data (a nested array of states and of its transitions — switching from one state to another. ). As result, I found that I will have only one state to manage all state transitions via the action type ‘MAKE_TRANSITION’ that will trigger a transition and provide different behaviour for the same action depending on current state. The current state changes by id, switching to the nextState of the transition.

Below, I have put the example of the data stored as an initial state of the reducer with the description afterward:

```javascript
const initState = {
    currentState: 'greeting',
    states: [
        {
            id: 'greeting',
            payload: {...},
            transitions: [
                {
                    trigger: {...},
                    nextState: 'do-you-like-to-start'
                }
            ]
        },
        {
           id: 'do-you-like-to-start',
           payload: {...},

           transitions: [
               {
                    trigger: {...},
                    nextState: 'ask-for-name'
               },
               {
                    trigger: {...},
                    nextState: 'more-details'
               }
           ]
        },
    ]
}
```

**currentState:** the state the application is currently in

**states:** contains all possible states of the state machine

**id:** the identifier of the state

**transitions:** allow to make the next logical move to the nextState

**payload:** touched data to each state for state machine

**trigger:** when transition should happen

```javascript
case t.MAKE_TRANSITION:
    return {
        ...state,
        currentState: action.nextState
    }
```

Above you see the implementation of the reducer with the “MAKE_TRANSITION” action.

That’s it. Thank you for reading! I hope you liked the possible data representation of the state machine. If you have any questions be free to contact me per [email](mailto:ilona@ilonacodes.com), [Twitter](https://twitter.com/ilonacodes) or [Instagram](https://www.instagram.com/ilonacodes/).

<br>
Cheers,

ilonacodes
