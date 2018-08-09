+++
css = []
highlight = true
date = "2018-08-09T7:00:05+01:00"
cover = "/blog/images/creating-floating-label-cover.jpeg"
title = "Creating Floating Label/Placeholder for Input with React"
tags = ["app", "css3", "label", "react", "webdesign", "tech", "JS"]
draft = false
scripts = []
description = "To make the application fancy, front-end web developers usually visualize it using animations or other effects. And now I am going to explain one of the methods how to apply the most famous floating label effect to the input field with React."
+++

{{< figure src="/blog/images/creating-floating-label-cover.jpeg" title="source: https://www.pexels.com/photo/several-assorted-color-tags-697059/" >}}

To make the application fancy, front-end web developers usually visualize it using animations or other effects. And now I am going to explain one of the methods how to apply the most famous floating label effect to the input field with React.

<!--more-->

The solutions based on the React project. You can set up one by running the following command in the console:

```
npx create-react-app my-app
cd my-app
npm start
```

Or create a React component in the existing project. In the following example, I am writing code in `<App />` component and styling in **App.css**

Let's start coding!

At first, in the `<App />` I have added the constructor, where the state consists of initial **inputValue** and **fieldActive** properties. Step by step, in the constructor I am going to add bounded methods.

```javascript
// App.js

import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			inputValue: '',
			fieldActive: false
		}
	}

	this.updateInputValue = this.updateInputValue.bind(this);
	this.activateField = this.activateField.bind(this);
	this.disableFocus = this.disableFocus.bind(this);
}
...
```

Secondly,  I am going to declare functions, which will allow handling the state of the input, and render the form with the label and input elements and style them with CSS. You can also wrap and style the form as you want, to customize it. Below I describe the approach relevant to implementing the floating label for input.

```javascript
// App.js

...
	// to activate the input field while typing
	activateField() {
		this.setState({
			fieldActivate: false
		})
	}

	// to deactivate input only if it's empty
	disableFocus(e) {
		if (e.target.value === "") {
            		this.setState({
                		fieldActivate: false
            		})
        	}
	}

        // to update the changes in the input and activate it
	updateInputValue(e) {
		this.setState({
			inputValue: e.target.value,
		});
		this.activateField(e);
		e.preventDefault();
	}

	render() {
		return (
			<div>
				<form>
					<div className="field-group">
					<label
					// check state the input, whether it is active then apply the class for floating label
					className={this.state.fieldActive ? "field-active" : ""}
					>
							Name
					</label>
					<input
						className="floating-label"
						type="text"
						value={this.state.inputValue}
						onFocus={this.activateField}
						onBlur={this.disableField}
						onChange={this.updateInputValue}
					/>
					</div>
				</form>
			</div>
		);
	}
}

export default App;
```

As I mentioned before, in this example I added some custom styles that do not influence the floating label effect. That's why I want to focus on how to style the label according to the name classes in the `<App />` component:

```css
/* App.css */

        /* initially label is below input */
	label {
		display: inline-block;
		position:absolute;
		left: 15px;
		top: 16px;
		transition: all 150ms ease-in;
		color: #676767;
	}

        /* when the label is activated, it jumps up (using translateY) */
        /* you could add animation here as well */
	label.field-active {
		transform: translateY(-25px);
		font-size: .9em;
		color: #000;
		text-shadow: 1px 0 0 #fff, -1px 0 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff;
	}

	.floating-label {
		-webkit-appearance: none !important;
	}
```
<br />
The result looks like:

![Result](/blog/images/creating-floating-label.png)

**That's it! Thank you for reading!**

I hope you have found this article useful and helpful. If you have any questions be free to contact me per [email](mailto:ilona@ilonacodes.com), [Twitter](https://twitter.com/ilonacodes) or [Instagram](https://www.instagram.com/ilonacodes/)

Cheers!
