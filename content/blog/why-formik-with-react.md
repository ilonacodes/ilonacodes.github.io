+++
css = []
highlight = true
date = "2018-09-15T18:40:05+01:00"
cover = "/blog/images/why-formik-with-react-cover.jpeg"
title = "Why Formik With React"
tags = ["app", "React", "JavaScript", "Formik", "web"]
draft = false
scripts = []
description = "The way, how I try to understand the purpose of any framework is to use it and compare with the already implemented no-framework solution."
+++

{{< figure src="/blog/images/why-formik-with-react-cover.jpeg" title="source: https://bit.ly/2paojyl" >}}
The way, how I try to understand the purpose of any framework is to use it and compare with the already implemented no-framework solution.

Sure, most of us, at first hear about a new library from tech media portals or from tech-dev influencers or from conferences/meetups or from coworkers, etc. then we are going to check out the source of it whether it is a software or open-source product. In the end, we are playing with it and trying to apply it to the existing product.

<!--more-->

I am also following these steps, but during the “playing” phase I prefer to the traditional implementation, that I already know how it should work, and afterward, I rewrite the existing solution using a new framework that I want to learn deeply.

The [Formik](https://github.com/jaredpalmer/formik) with React was not an exception of this rule.

As an example, I started with implementing the customer form only with React (I am going to skip the snippet and App.js where I have imported the `<CustomerFormFormik />` and `<CustomerFormReact />` to render them in DOM, because it’s not relevant to this post), and explain one of the reasons “that’s why **Formik**”.

Of course, you can check out the [Formik documentation](https://jaredpalmer.com/formik/docs/overview) and find out all its advantages. In short, which I understand are there:

- Redux free
- or with naming conventions from redux-form
- HOC pattern (using connect() from Redux to pass state and dispatch actions to reducer)
- render props approach with React
- special validation Schema with Yup
- … and so on…

So, it’s the time to have a look at the simple customer form with React. We’ll start simple — with one input field:

```javascript
// CustomerFormReact.js

import React from 'react';

export class CustomerFormReact extends React.Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
        };

        this.onChangeInputFirstName = this.onChangeInputFirstName.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onChangeInputFirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    onSubmitForm(e) {
        e.preventDefault();
        this.props.createCustomer(this.state);
    }

    render() {
        return (
            <form onSubmit={this.onSubmitForm}>
                <input type="text"
                       name="firstName"
                       onChange={this.onChangeInputFirstName}
                />

                <button type="submit">Submit</button>
            </form>
        );
    }
}
```

As you noticed, for a single input element the boiler-plate is not that big. But what happens, if we add two extra input fields for this form?

```javascript
// CustomerFormReact.js

import React from 'react';

export class CustomerFormReact extends React.Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        };

        this.onChangeInputFirstName = this.onChangeInputFirstName.bind(this);
        this.onChangeInputLastName = this.onChangeInputLastName.bind(this);
        this.onChangeInputEmail = this.onChangeInputEmail.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onChangeInputFirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeInputLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    onChangeInputEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onSubmitForm(e) {
        e.preventDefault();
        this.props.createCustomer(this.state);
    }

    render() {
        return (
            <form onSubmit={this.onSubmitForm}>
                <input type="text"
                       name="firstName"
                       onChange={this.onChangeInputFirstName}
                />

                <input type="text"
                       name="lastName"
                       onChange={this.onChangeInputLastName}
                />

                <input type="email"
                       name="email"
                       onChange={this.onChangeInputEmail}
                />

                <button type="submit">Submit</button>
            </form>
        );
    }
}
```

And you are right, it looks messy. There are lots of duplication and also a lot of ways to solve it. The question is, which one is more suitable for the project, whether it’s only the form or not, or includes more different inputs, etc. So, one of them is using **Formik**:

```javascript
// CustomerFormFormik.js

import React from 'react';
import {Field, Formik} from 'formik';
// accept props from the parent component
export const CustomerFormFormik = (props) => {
    // initial state (starting field values)
    const initialValues = {
        firstName: '',
        lastName: '',
        email: ''
    };

    return (
        // pass initial field values and actions to Formik-component
        <Formik
            intialValues={initialValues}
            onSubmit={(values, actions) => {
                // applying HOC-pattern
                props.createCustomer(values);
                actions.setSubmitting(false);
                actions.resetForm(initialValues);
            }}
            render={(props) => (
                <form onSubmit={props.handleSubmit}>
// add as much as needed input fields & by name binding them to the state
                    <Field type="text" name="firstName" />
                    <Field type="text" name="lastName" />
                    <Field type="email" name="email"/>
                    <button type="submit">Submit</button>
                </form>
            )}
        />
    );
};
```

Tadaaam! It works and looks more structured and elegant!

Perhaps, my dear reader, you can already dive in more advanced stuff with **Formik**, but to understand its fundamental concepts and then step by step to go deeper into it is also worth the time and effort.

I hope you find this post useful and would like to try **Formik** with React.
Thank you for reading! 👏

If you have better methods on how to learn different frameworks in the encouraging and “unpainful” way, don’t hesitate to contact me per [email](mailto:ilona@ilonacodes.com), on [Twitter](https://twitter.com/ilonacodes) or [Instagram](https://www.instagram.com/ilonacodes/).

Cheers!

_(This article was original published [on my medium](https://medium.com/@ilonacodes/why-formik-with-react-e640c1934d6))_
