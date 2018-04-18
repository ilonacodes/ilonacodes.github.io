+++
css = []
highlight = true
date = "2018-04-18T12:00:05+01:00"
title = "Front-end Shorts: Storybook With React"
tags = ["react", "redux", "javascript", "storybook", "frontend", "learntocode", "coding", "letsgetcoding", "womenwhocode"]
draft = false
scripts = []
description = "Lately, I worked on the project that generates live documentation of the front-end components for apps built with create-react-app, and this UI development environment is called Storybook."
+++

Hey there, that’s me again and a new post from me!

Lately, I worked on the project that generates live documentation of the front-end components for apps built with create-react-app, and this UI development environment is called [Storybook](https://storybook.js.org).

What is the significant purpose for using this tool?

First of all, it helps to avoid code duplications and to make it easy to know which components there are already, what they are doing and how they are being used.

Secondly, it allows to display and to test component behavior by showcase, which is very useful in getting quick feedback on everything we develop.

Another fantastic thing, `React Storybook` is an isolated app.
After declaring stories, you can start to create components in isolation with quick iteration, and that allows us to create component documentation (style guide) without explicitly doing so, and keeps it up-to-date.

Now it’s time to show you how it works and which components are involved.

But before trying my example, you have to install and run Storybook with React. You can read about that [here](https://storybook.js.org/basics/guide-react/).

 After you installed `React Storybook`, let's have a look at my footer implementation:

```javascript
// ./components/footer/Footer.js

import React from 'react';
import DisplayFooter from './DisplayFooter';
import ResponsiveFooter from './ResponsiveFooter';

const Footer = props => (
  <div className='footer'>
    <DisplayFooter {...props} />
    <ResponsiveFooter {...props} />
  </div>
)

export default Footer
```   

Above you see standard React component. The next step is creating `Footer.stories.js` file and to add `Footer` component to stories:

```javascript
// ./components/footer/Footer.stories.js

import React from 'react';
import { storiesOf } from '@storybook/react'
import Footer from './Footer'

storiesOf('Footer', module).add('default', () => <Footer />)
```

To see the result, you have to type this command `npm run storybook` in your project path in the console line, what will run that on your localhost.

It might work with apps that have a similar Webpack configuration to create-react-app, for example, for Angular or Vue web apps.

Let me know what you think about using `Storybook with React`. Thank you for reading!
