+++
tags = ["react", "reactjs", "learntocode", "beginners", "coding", "letsgetcoding"]
draft = false
date = "2017-09-15T16:25:05+01:00"
scripts = []
css = []
highlight = true
title = "React For Very Very Beginners"
description = "The biggest challenge for beginners not only in front end development but also in the whole web development world is to find the answer to the question: How / Where should I start to learn web development?"
+++

The biggest challenge for beginners not only in front end development but also in the whole web development world is to find the answer to the question: How / Where should I start to learn web development? Some of these questions I have already received via private messages on social networks, and that encouraged me to create a series of small posts to write and complete the first app using JS (ECMA6) with React-Redux frameworks on which technologies I specialize.

Our goal for the first application is to write an interactive daily TODO list application. In particular, by finishing this series, you should be able to understand the basic concepts, structures and "communication" between React-Redux in use.

No more talking and let's start. I am sure my readers are pretty curious about how to manage and control operation flow on the computer and already familiar with some Unix commands to manage their stuff in command line. However, I am going to write down some of them that we will use. First, we should make a workspace directory for the app and then change into this directory.

Type in the command line:

```
cd
mkdir workspace
cd workspace
```

And voilà! We are already inside the directory for our app!

The next step is to install npm. It is a package manager for Node.js that creates some of your directory structure/organization. Also, helps with installing various packages and resolving their dependencies.

<span style="color:red"> If you didn't use Node.js before, you should install it. Just visit this link https://nodejs.org/en/download/ and install it. </span>

It will be enough for our app to type this command in the Unix command line:

```
npm install npm@latest -g
```

Don't forget to check the version of npm (double-check if it has been installed correctly) running this command in your terminal:

```
npm -v
```

Finally, we are ready to create our first React-App! Notice that we are still in the workspace directory and continue typing in the terminal the commands below:

```
npm install -g create-react-app
create-react-app my-daily-todos
```

Yeah, here we are getting started with React. The first line allows us to install the global package and the second one to use it to create a new React App with the name "my-daily-todos".

Congratulations! You have installed your first React-App. And to see the results, how it looks like, we have to launch the development server:

```
npm start
```

And the browser will automatically open URL of the created React application on the random localhost address.
Sure, you are encouraged to learn more about the React structure.

So now we are moving to the next step: open our app and take a look at the code in your favorite text/code editor.
Don't forget that the local server is still working and we could check our changes in the code by refreshing the page with the localhost address. Now I am going to render "Oh, hi there!" message. In our case, we have to open App.js (my-daily-todos/src/App.js). What should you see on the screen:

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

```

And then just to add a new paragraph-tag with the text: "Oh, hi there!" inside the `className` "App", after the `className` "App-intro":

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <p>
          Oh, hi there!
        </p>

      </div>
    );
  }
}

export default App;

```

After refreshing the localhost page, you should see the added text below the previous content.

Hopefully,  you enjoyed my explanation how to start with React and would like to know more about the launching Redux, why we need it and look closer to all our dependencies in one file.

Thank you for reading and your kind interest in my post!
