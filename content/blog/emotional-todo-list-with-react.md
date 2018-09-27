+++
css = []
highlight = true
date = "2018-09-07T18:40:05+01:00"
cover = "/blog/images/emotional-todo-list-cover.jpeg"
title = "Emotional Todo List with React"
tags = ["app", "React", "JavaScript", "Emotion", "web"]
draft = false
scripts = []
description = "From the title of the post, you understand that I am not only going to explain how to implement a traditional TODO-List with React, but also show you how I am applying emotion-js for this mini-project."
+++

{{< figure src="/blog/images/emotional-todo-list-cover.jpeg" title="source: https://bit.ly/2NXyGjE" >}}
From the title of the post, you understand that I am not only going to explain how to implement a traditional TODO-List with React, but also show you how I am applying [emotion-js](https://emotion.sh/) for this mini-project.

<!--more-->

Let’s start with setting up a new react app following the official documentation [here](https://reactjs.org/docs/create-a-new-react-app.html).

Afterward, we are going to write a simple TODO-List. I decided just to put the code below because the main point of the post is using the **Emotion** library to style the extracted components.

Simple TODO-List with React:

```javascript
// TodoList.js

import React from 'react';
export const TodoList = (props) => {
    return(
        <ul>
            {props.todoItems.map((todo, index) =>
                <li key={index}>{todo}</li>
            )}
        </ul>
    );
};
```

and

```javascript
// App.js

import React, {Component} from 'react';
import './App.css';
import {TodoList} from './TodoList';
class App extends Component {
    constructor() {
        super();
this.state = {
            inputValue: '',
            todoItems: []
        };
this.onChangeInputValue = this.onChangeInputValue.bind(this);
        this.onSubmitInputValue = this.onSubmitInputValue.bind(this);
    }
onChangeInputValue(event) {
        this.setState({
            inputValue: event.target.value
        });
    }
onSubmitInputValue(event) {
        event.preventDefault();
        this.setState({
            inputValue: '',
            todoItems: [...this.state.todoItems, this.state.inputValue]
        });
    }
render() {
        return (
            <div>
                <form onSubmit={this.onSubmitInputValue}>
                    <input type="text"
                           value={this.state.inputValue}
                           onChange={this.onChangeInputValue}/>
                    <button>Create</button>
                </form>
                <TodoList todoItems={this.state.todoItems}/>
            </div>
        );
    }
}
export default App;
```

I would like to have a component, styled with **Emotion**, that takes props that ultimately control the styling. Moreover, any expression, or interpolation, can be a function and CSS classes are what we have been generating when we use SCSS/CSS Modules. This is a compelling pattern that can be used to compose reusable styles across any project.

So, the next step is to install the most useful **Emotion** packages:

```
npm install --save emotion react-emotion babel-plugin-emotion
```

Instead of styling DOM elements with CSS, I have created **Styled Components**, so then I can call it with a template literal for string styles everywhere in the project I want to.

Because I prefer planning and styling from containers and wrappers (especially, if I use flexbox for that), I have started with extracting, styling and using `<Container />` and `<Wrapper />` components.

```javascript
// App.js
...
// importing styled method
import styled from 'react-emotion';
...
// declaring a new component
const Container = styled('div')`
    display: flex;
    overflow: hidden;
    justify-content: center;
    height: 100vh;
    align-items: center;
    font-family: 'Source Sans Pro', sans-serif;
    flex-direction: column;
    box-shadow: 0 0 5px rgba(25, 25, 25, 0.25);
`;
const Wrapper = styled('div')`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 20px;
`;
class App extends Component {
 ...
 render() {
        return (
 // applying components
            <Container>
                <Wrapper>
                     <form onSubmit={this.onSubmitInputValue}>
   ...
                </Wrapper>
            </Container>
        );
    }
}
export default App;
```

Next, I have created components : `<CreateTodoForm />`, `<CreateTodoInput />` and `<CreateTodoButton />` to style the form, separated them into js-files and imported to the App.js

```javascript
// CreateTodoForm.js

import React from 'react';
import styled from 'react-emotion';
export const CreateTodoForm = styled('form')`
    width: 400px;
    padding: 1rem;
    display: flex;
    border-radius: 20px;
`;
```

and

```javascript
// CreateTodoInput.js

import React from 'react';
import styled from 'react-emotion';
export const CreateTodoInput = styled('input')`
    width: 100%;
    font-size: 14px;
    margin: 0 0.5rem;
    border-radius: 2rem;
    padding: .75em 1.5rem;
    background: none;
    border: #e3e3e3 1px solid;
    transition: border 250ms ease-out;
    &:focus {
        border: #4fc08d 1px solid;
        outline: none;
    }
`;
```

and

```javascript
// CreateTodoButton.js

import React from 'react';
import styled from 'react-emotion';
export const CreateTodoButton = styled('button')`
    font-size: 14px;
    margin: 0 0.5em;
    border-radius: 2em;
    padding: 0.75em 1.5em;
    cursor: pointer;
    background: none;
    border: 1px solid #4fc08d;
    letter-spacing: 1px;
    font-family: "Source Sans Pro", sans-serif;
    color: #4fc08d;
    transition: 250ms ease-out;
    &:hover, &:focus {
        color: #fff;
        background: #4fc08d;
        outline: none;
    }
`;
```

then

```javascript
// App.js

import React, {Component} from 'react';
import styled from 'react-emotion';
import './App.css';
import {TodoList} from './TodoList';
// importing form-components
import {CreateTodoInput} from './components/CreateTodoInput';
import {CreateTodoButton} from './components/CreateTodoButton';
import {CreateTodoForm} from './components/CreateTodoForm';
const Container = styled('div')`
    display: flex;
    overflow: hidden;
    justify-content: center;
    height: 100vh;
    align-items: center;
    font-family: 'Source Sans Pro', sans-serif;
    flex-direction: column;
    box-shadow: 0 0 5px rgba(25, 25, 25, 0.25);
`;
const Wrapper = styled('div')`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 20px;
`;
class App extends Component {
    constructor() {
        super();
this.state = {
            inputValue: '',
            todoItems: []
        };
this.onChangeInputValue = this.onChangeInputValue.bind(this);
        this.onSubmitInputValue = this.onSubmitInputValue.bind(this);
    }
onChangeInputValue(event) {
        this.setState({
            inputValue: event.target.value
        });
    }
onSubmitInputValue(event) {
        event.preventDefault();
        this.setState({
            inputValue: '',
            todoItems: [...this.state.todoItems, this.state.inputValue]
        });
    }
render() {
        return (
            <Container>
                <Wrapper>
   // applying components to render them
                    <CreateTodoForm onSubmit={this.onSubmitInputValue}>
                        <CreateTodoInput type="text"
                               value={this.state.inputValue}
                               onChange={this.onChangeInputValue}/>
                        <CreateTodoButton>Create</CreateTodoButton>
                    </CreateTodoForm>
                    <TodoList todoItems={this.state.todoItems}/>
                </Wrapper>
            </Container>
        );
    }
}
export default App;
```

Here is the final result:

![Result](/blog/images/emotional-todo-list-result.png)

That’s it for today. I hope you like my small explanation! Thank you for reading! 👏

_(This article was original published [on my medium](https://medium.com/@ilonacodes/emotional-todo-list-with-react-a458f57854a9))_
