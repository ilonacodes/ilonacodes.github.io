+++
css = []
highlight = true
date = "2019-01-11T10:40:05+01:00"
cover = "/blog/images/reactstrap.jpg"
title = "Harnessing the power of Bootstrap in React with Reactstrap"
tags = ["web", "reactjs", "reactstrap", "bootstrap", "tech"]
draft = false
scripts = []
description = "Nowadays there are a lot of UI frameworks for React like Bootstrap, UIKit, Semantic UI and so on. Depending on the project complexity and requirements, you decide which front-end framework would be used because the main reason is to ease your development process."
+++

{{< figure src="/blog/images/reactstrap.jpg" title="source: bit.ly/2TJDcVt" >}}
Nowadays there are a lot of UI frameworks for React like Bootstrap, UIKit, Semantic UI and so on. Depending on the project complexity and requirements, you decide which front-end framework would be used because the main reason is to ease your development process.

<!--more-->

Pure JavaScript implementation will not work well with the state-driven frameworks like React, so here software developers and engineers start looking for React components to fit the styling need.

I really like work with [Bootstrap](https://getbootstrap.com/) which usually helps me put nice styled and consistent elements in my user interface. Also, it consists of CSS, JS, static assets distributed as npm packages.

However, earlier while I was working on the project with Bootstrap I found that a little bit messy and sometimes confusing to use a bunch of classes for each DOM-element to make design fancy and responsive.

In fact, it pushed me to switch to CSS flexbox layout to polish UI, align and distribute space among app elements.

Until I tried [Reactstrap](https://reactstrap.github.io/).

It’s very simple to use, supports Bootstrap 4 and is well maintained - just check out its [documentation](https://reactstrap.github.io/components/alerts/).

Reactstrap is similar to Bootstrap, but as self-contained components of marking `<div />` with class names. Basically, all required components are imported as a bunch of elements you need to start building UI.

In my opinion, self-contained components do have advantages over a large stylesheet, div soup, class names, and query hooks.

In case, if you need a button - you import a `<Button />`. As a result, it will behave like one out of the box and even though it can be restyled with generic CSS too.

To convince you to try Reactstrap, I have prepared an example web app that uses MovieTime API. MovieTime website allows users to search movies and read movie details of each film in the retrieved movie list.

The list of movies I have fetched through [The Movie Db API](https://www.themoviedb.org/documentation/api) and styled with Reactstrap.

There are three main parts of the app: Navigation, Search field and List of movies.

```javascript
<Container>
    {/*Navigation*/}
    <Row>
        <Col sm="12">
            {/*...*/}
        </Col>
    </Row>

    {/*Search field and button*/}
    <Row className="search">
        <Col sm="12">
            {/*...*/}
        </Col>
    </Row>

    {/*The fetched list of movies*/}
    <Row className="content">
        {/*...*/}
    </Row>
</Container>
```

There is a big `<Container>` which contains all app elements. Each of the parts is encapsulated inside the `<Row>`. Though, there are only three rows.

Each row has at least one `<Col>` or more which have horizontal padding for controlling the space between them. The width of the `<Col>` depends on the `<Col>` classes, that indicate the number of columns in the row (no more than 12).

If you have already worked with Bootstrap, you know its class orders. First, it's necessary to create `<div>` element with the class name **"container"**, then to nest a new `<div>` with the **"row"** class and inside this element to put a new `<div>` element with the **"col"** class.

`<Container>`, `<Row>`, `<Col>` are layout components. Each component has props which can be changed to customize its design.

In Reactstrap the grid breakpoints are based on minimum width media queries (e.g., .col-sm-4 applies to small, medium, large, and extra large devices, but not the first xs breakpoint).

This system is very similar to Bootstrap’s grid system.

Here is the code example:

```javascript
import React from 'react';
import {
    Button, Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Row
} from "reactstrap";
import {Movie} from "./Movie";

class Dashboard extends React.Component {
    constructor(props) {
         // ...
    }

    render() {
        return (
            <Container>
                {/*Navigation*/}
                <Row>
                    <Col sm="12">
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="/">MovieTime</NavbarBrand>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="https://www.themoviedb.org">
                                        This product uses the TMDb API but is
                                        not endorsed or certified by TMDb
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>

                {/*Search field and button*/}
                <Row className="search">
                    <Col sm="12">
                        <InputGroup>
                            <Input placeholder="Find a movie"/>
                            <InputGroupAddon addonType="prepend">
                                <Button color="success"
                                        className="search-button">
                                    Search
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>

                {/*The fetched list of movies*/}
                <Row className="content">
                    {
                        this.state.movies.map(movie =>
                            <Col xs="6" sm="4"
                                 key={movie.id}
                                 className="movie">
                                <Movie movie={movie} />
                            </Col>
                        )
                    }
                </Row>
            </Container>
        );
    }
};

export default Dashboard;
```

As you noticed all required class wrapped components are imported from the **'reactstrap'** package. Besides that, it's also required to install Bootstrap library and import the corresponding link to the index.js file of the 'create-react-app.' Read more details about how to get started [here](https://reactstrap.github.io/).

The result for desktop and mobile views:

{{< figure src="/blog/images/react-bootstrap-reactstrap-result.png" >}}

That's it. **Thank you for reading!**

Would you like to try Reactstrap, if not why?
Which area of JavaScript/React are you interested in?
Leave a comment or [tweet](https://twitter.com/@ilonacodes) to let me know so I could write about it next.

Or maybe you want to extend your specialization to fullstack, then check out **"frontend2fullstack"** video series on my [YouTube channel](https://www.youtube.com/watch?v=kI1luxh-Hyg&list=PL3VhbJS_wXnEmeY4T6urz_fy_U03S9fqr).

Have a great weekend and code your best!
