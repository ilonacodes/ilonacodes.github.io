+++
css = []
highlight = true
date = "2018-07-27T7:00:05+01:00"
cover = "/blog/images/intl-your-app-with-react.jpeg"
title = "Internationalize Your App With React"
tags = ["IT", "app", "react", "webdesign", "library", "tech", "JS"]
draft = false
scripts = []
description = ""
+++

{{< figure src="/blog/images/intl-your-app-with-react.jpeg" title="source: https://www.pexels.com/photo/ball-shaped-blur-close-up-focus-346885/" >}}

Nowadays any viable product pursues the goal to grow globally. That means the successful online product is supposed to have minimum two language locales. One of them is english as an international language, and the other one depends on the spoken language of the target audience (usually domestic).

<!--more-->

To internationalize the app using a React JS-Framework, I recommend you to install the **react-intl** library that allows handling translation messages depending on the current locale.

To demonstrate how it works and which problems I had with it, I wrote this post where I will explain below the usage of the library in my example.

**The task was: "Add custom translations to english and german locales"**

When I started applying it to the existing React app, I was a little bit confused about how I could do that properly. I guess, because of the lack of clear examples.

So, I’ve spent some time playing around with it and digging through docs and finally nailed it. Here is what worked for me.

Traditionally, I started with library configuration, creating required files, passing props, using locales and finishing with routing them. 

We need to create the react application in the folder:

```
npx create-react-app my-app
cd my-app
npm start
```
Then remove all unnecessary elements added by default, that the following components look like:

```javascript
// App.js
import React, {Component} from 'react';
import './App.css';
class App extends Component {
render() {
        return (
       	        <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">
                         Hello World!
                        </h1>
                    </header>
                </div>
        );
    }
}
```
```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```
The next step is to install **react-intl** library into the project:

```
$ npm install react-intl --save
```

And return to the **index.js** again to import and add the next **"en"** and **"de"** language locales calling **addLocaleData()** function from the **react-intl** library:

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import de from 'react-intl/locale-data/de';
import en from 'react-intl/locale-data/en';
import {addLocaleData} from 'react-intl';

addLocaleData([...de, ...en]);

ReactDOM.render(<App />, document.getElementById('root'));
```
_Here I was confused why do I need to load locale data from the library when I want to only provide my translations file. Doesn’t quite make sense._

Now we can add **"en.json"** and **"de.json"** files with the **JSON object** of translations into the created by us **locales** folder:

```json
// ./locales/en.json

{
	greeting: "Hello Ilona"
}
```
```json
// ./locales/de.json

{
	greeting: "Hallo Ilona"
}
```
To render the messages relevant to each locale, we are going to create a new `<Greeting />` component that includes the `<FormattedMessage />` from **react-intl** (don't forget to import it) and by id (as a key) determines the rendered value to users:

```javascript
// Greeting.js
import React from 'react';
import {FormattedMessage} from 'react-intl';

export class Greeting extends React.Component {
    render() {
        return (
            <div>
                <p>
                    <FormattedMessage id="greeting" />
                </p>
            </div>
        );
    }
}
```
Then I decided to write the basic logic in the `<App />` component to simplify and show you all **chains** in one file. 
Firstly, we do all imports like the **en.json** & **de.json** locales that we have created, `<IntlProvider />` component which we need to provide the translated strings/messages at the root of the component tree and make them available to all components of the project.

```javascript
// App.js
import React, {Component} from 'react';

import './App.css';
import {Greeting} from './Greeting';

import deTranslations from './locales/de.json';
import enTranslations from './locales/en.json';

import {IntlProvider} from 'react-intl';
...
```
And add a constructor with required prop fields, where the state store the current locale and messages with the imported custom translation. To switch to translations, I also use two different methods: **setEnLocale()** and **setDeLocale()**, that are bound to the object.

```javascript
// App.js
...
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locale: 'de'
        };

        this.messages = {
            en: enTranslations,
            de: deTranslations
        };

        this.setEnLocale = this.setEnLocale.bind(this);
        this.setDeLocale = this.setDeLocale.bind(this);
    }

    setEnLocale() {
        this.setState({
            locale: 'en'
        });
    }

    setDeLocale() {
        this.setState({
            locale: 'de'
        });
    }
...
```
The last step is to render the `<App />` component and allow to change between locales by help the `<IntlProvider />` with the passed locale state, messages object and imported `<Greeting />` component within the relevant message to each locale:

```javascript
// App.js
...
    render() {
        return (
                <IntlProvider
                locale={this.state.locale}
                messages={this.messages[this.state.locale]}
            >
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">
                            <Greeting />
                        </h1>
                    </header>
                    <button onClick={this.setEnLocale}>EN</button>
                    <button onClick={this.setDeLocale}>DE</button>
                </div>
            </IntlProvider>
        );
    }
}

export default App;
```
The right  full coded `<App />` looks like:

```javascript
// App.js

import React, {Component} from 'react';

import './App.css';
import {Greeting} from './Greeting';

import deTranslations from './locales/de.json';
import enTranslations from './locales/en.json';

import {IntlProvider} from 'react-intl';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locale: 'de'
        };

        this.messages = {
            en: enTranslations,
            de: deTranslations
        };

        this.setEnLocale = this.setEnLocale.bind(this);
        this.setDeLocale = this.setDeLocale.bind(this);
    }

    setEnLocale() {
        this.setState({
            locale: 'en'
        });
    }

    setDeLocale() {
        this.setState({
            locale: 'de'
        });
    }

    render() {
        return (
                <IntlProvider
                locale={this.state.locale}
                messages={this.messages[this.state.locale]}
            >
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">
                            <Greeting />
                        </h1>
                    </header>
                    <button onClick={this.setEnLocale}>EN</button>
                    <button onClick={this.setDeLocale}>DE</button>
                </div>
            </IntlProvider>
        );
    }
}

export default App;
```
That's it. I hope now you will not spend much time as I did by integrating two or more different language locales with customized translations with **react-intl** library.

**Thank you for reading!** 😊

You can get in touch with me not only by [email](mailto:ilona@ilonacodes.com) but also on [Twitter](https://twitter.com/ilonacodes) or [Instagram](https://www.instagram.com/ilonacodes/)

Cheers! 

























