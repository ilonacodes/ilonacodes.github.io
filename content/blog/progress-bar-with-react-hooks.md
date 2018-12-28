+++
css = []
highlight = true
date = "2018-12-28T10:40:05+01:00"
cover = "/blog/images/progress-bar-with-react-hooks.jpg"
title = "Let’s implement: Progress Bar With React Hooks"
tags = ["web", "reactjs", "javascript", "hooks", "tech"]
draft = false
scripts = []
description = "After React Hooks introduction at React Conf October 2018 I decided to learn this approach how to use state and side-effects in React functional components."
+++

{{< figure src="/blog/images/progress-bar-with-react-hooks.jpg" title="source: Photo by Roman Kraft on Unsplash" >}}
After **React Hooks** introduction at [React Conf October 2018](https://www.youtube.com/watch?v=dpw9EHDh2bM) I decided to learn this approach how to use state and side-effects in React functional components.

<!--more-->

Traditionally, any stateless component in ReactJS called functional component and now with **React Hooks** it is possible to store the state inside them.

And today I am going to share my experience how I have tried to apply **React Hooks** for the simple Progress Bar implementation.

The reason why **React Hooks** have been developed is to avoid the functional component refactor into the class component for using lifecycle methods. In this case, hook functions allow writing ReactJS application with functional components only by using side-effects and local state.

Let’s see how it works with the following Progress Bar Example:

I suggest installing a new **'create-react-app'** app called **'progress-bar-with-hooks'**. The detailed information on how you can do that find [here](https://reactjs.org/docs/create-a-new-react-app.html).

After creating **‘progress-bar-with-hooks’** project, open it in your favorite text editor or IDE to check out its structure. I also advise deleting all unnecessary DOM-elements from the `<App />` in **App.js**, so that at the beginning it looks like:

```javascript
// App.js

import React, {Component} from 'react';

class App extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default App;
```

The next step is to create **ProgressBar.js** file in the **'src'** directory and
create the following functional components:

```javascript
// ProgressBar.js

import React from 'react';

const Range = (props) => {
    return (
        <div/>
    );
};

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <Range/>
        </div>
    );
};

export const ProgressBarContainer = () => {
    return (
        <div className="container">
            <ProgressBar/>
        </div>
    );
};
```

`<Range />` handles and render the current status of the progress bar.

`<ProgressBar />` represents the full progress bar border and wrap the `<Range />` component, so the user sees how filled the whole progress bar is limit.

`<ProgressBarContainer />` is the higher-order component and carries the whole app state using applied hook functions. This state also will be passing to the other app components through props.

Let’s add state **[percentRange, setProgress]** to the `<ProgressBarContainer/>` using **useState()** hook and **0** as the initial state value:

```javascript
//ProgressBar.js;

// import hook func from react
import React, {useState} from 'react';

...

export const ProgressBarContainer = () => {
    // init state through hook func useState()
    const [percentRange, setProgress] = useState(0);

    return (
        <div className="container">
            {/*pass the percentageRange state to other components*/}
            <ProgressBar percentRange={percentRange}/>
            <div className="toggle-buttons">
                {/* call setProgress func on button click and bind the callback*/}
                {/* depending on the percentageRange condition to decrease /*/}
                {/* increase in 20% range and reset the progress bar status*/}
                <button onClick={() => setProgress(percentRange > 0 ?
                    percentRange - 20 : 0)}>Decrease
                </button>
                <button onClick={() => setProgress(percentRange < 100 ? percentRange + 20 : 100)}>Increase</button>
                <button onClick={() => setProgress(0)}>Reset</button>
            </div>
        </div>
    );
};
```

To make the app work properly - to allow the progress bar’s range changing
in width dynamically - it’s necessary to pass **percentageRange** state through props features of ReactJS to the `<ProgressBar />` and `<Range />` functional components:

```javascript
// ProgressBar.js

import React from 'react';
// the custom styling for progress bar app
import './progress-bar.css';

// pass percentRange state through props to Range an ProgressBar components
const Range = (props) => {
    return (
        // render current the filled range of progress bar along its width
        <div className="range" style={{width: `${props.percentRange}%`}}/>
    );
};

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            {/*render available progress bar’s limit*/}
            <Range percentRange={props.percentRange}/>
        </div>
    );
};

...
```

As you noticed above, I have imported **progress-bar.css** at the top and below you will find the custom CSS-styles that I have used for the progress bar:

```css
{* progress-bar.css *}

.container {
 	display: flex;
 	justify-content: center;
 	align-items: center;
 	flex-direction: column;
 	width: 100%;
 	height: 100vh;
}

.progress-bar {
 	width: 350px;
 	height: 35px;
 	border-radius: 50px;
 	border: 2px solid #666;
 	margin-bottom: 40px;
}

.range {
 	background: limegreen;
 	height: 100%;
 	border-radius: inherit;
 	transition: width .3s ease-in;
}

.toggle-buttons button {
 	margin: 0 10px;
 	padding: 7px 20px;
 	border-radius: 5px;
 	outline: 0;
 	cursor: pointer;
}

.toggle-buttons button:hover {
 	color: white;
 	background: #666;
}
```

Here you can see the finished version of **ProgressBar.js** with the fully implementation:

```javascript
// ProgressBar.js

import React, {useState} from 'react';
import './progress-bar.css';

const Range = (props) => {
    return (
        <div className="range" style={{width: `${props.percentRange}%`}}/>
    );
};

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <Range percentRange={props.percentRange}/>
        </div>
    );
};

export const ProgressBarContainer = () => {
    let [percentRange, setProgress] = useState(0);

    return (
        <div className="container">
            <ProgressBar percentRange={percentRange}/>
            <div className="toggle-buttons">
                <button onClick={() => setProgress(percentRange > 0 ?
                    percentRange - 20 : 0)}>Decrease
                </button>
                <button onClick={() => setProgress(percentRange < 100 ? percentRange + 20 : 100)}>Increase</button>
                <button onClick={() => setProgress(0)}>Reset</button>
            </div>
        </div>
    );
};
```

The last step to complete the web app is to import the functional `<ProgressBarComponent />` component to the class `<App />` component:

```javascript
// App.js

import React, {Component} from 'react';
import {ProgressBarContainer} from './ProgressBar';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <ProgressBarContainer/>
            </div>
        );
    }
}

export default App;
```

And then run the command **'npm start'** in the terminal inside the **'progress-bar-with-hooks'** project directory to check how it works. If you did everything right, the result would be appeared like:

{{< figure src="/blog/images/progress-bar-with-react-hooks-result.png" >}}

**That’s it! Thank you for reading!**

Want to dive deeper into software development? Watch and subscribe for the upcoming **“From Frontend to Fullstack Engineer”** series on my [YouTube channel](https://www.youtube.com/channel/UCZHUFhQTMcJVekb6KAqqtkg).

You can also check out official documentation to [React Hooks](https://reactjs.org/docs/hooks-intro.html), if you want to learn more about the state and effect hooks.

I would like to hear your thoughts if you found the post helpful or not.

Don’t forget to reach me through my [email](mailto:ilona@ilonacodes.com) or my social media: [Twitter](https://www.twitter.com/ilonacodes) & [Instagram](https://www.instagram.com/ilonacodes).

December is really hectic for all of us. Enjoy your holidays and Happy New Year!

Cheers, ilonacodes
