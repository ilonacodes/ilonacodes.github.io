+++
css = []
highlight = true
date = "2018-10-11T10:40:05+01:00"
cover = "/blog/images/react-children-prop.jpeg"
title = "How to Avoid Duplication of Common Wrapper Behavior in React Using Children Prop"
tags = ["web", "react", "javascript", "props", "tech"]
draft = false
scripts = []
description = "When I was learning React there were a couple things that I couldn't clearly understand and one of them was “children” prop. That is until I faced the problem similar to the following one."
+++

{{< figure src="/blog/images/react-children-prop.jpeg" title="source: bit.ly/2xzBpaF" >}}

When I was learning React there were a couple things that I couldn't clearly understand and one of them was **children prop**. That is until I faced the problem similar to the following one.

<!--more-->

While working on the **"More Details"** feature for a few components that differ only by the title. I decided to create the wrapper component  `<MoreDetails />`. Because I have to manage the state of whether it is shown or not, it has to be a class component. So, that allows me to pass the specific title through the children prop and avoid the duplicated usage of wrapper. Below you will see the  render method of the wrapper component:

```javascript
// MoreDetails.js

...
render() {
        return (
            <div>
                <Accordion>
                    // in this place should be a title for each invoking the MoreDetails component
                    {this.props.children}
                    <button onClick={this.showContent}>
                        {this.state.showedContent ? 'Ausblenden' : 'Anzeigen'}
                    </button>
                </Accordion>
                <MoreDetailsComponent className={this.state.showedContent ? show : hide}/>
            </div>
        );
    }
}
```

To show the usage of children prop just use the full tag `<MoreDetails>...</MoreDetails>` and put the children between the opening and closing tags. For example:

```javascript
// VideoDetails.js

...
return(
  <div>
      // all <p> DOM-element and all texts inside are {this.props.children} for <MoreDetails /> component
      <MoreDetails><p>Notizen</p></MoreDetails>
      <MoreDetails><p>Feedback an Dozenten</p></MoreDetails>
      <MoreDetails><p>Kommentare</p></MoreDetails>
  	...
  </div>                   
```   

Since the goal of children prop for this task is just to render the content of the `<p>` element, so I can customize the title to whatever I need and keep reusing the `<MoreDetails />` component.

You can read more about **React.Children API** and find more details [here](https://reactjs.org/docs/react-api.html#react.children).

**Thank you for reading!**

I hope you find this post useful for applying props.children to your React project.

<br>
Cheers,

ilonacodes
