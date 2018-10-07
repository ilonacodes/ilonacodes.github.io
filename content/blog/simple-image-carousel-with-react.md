+++
css = []
highlight = true
date = "2018-10-06T10:40:05+01:00"
cover = "/blog/images/simple-image-carousel-with-react.jpeg"
title = "Simple Image Carousel with React"
tags = ["web", "react", "javascript", "carousel", "tech"]
draft = false
scripts = []
description = "Here we are! Due to my master thesis at the university, one of the requirements is the implementation of an interactive mockup for the university WebTV platform. So, I decided to make it with React."
+++

{{< figure src="/blog/images/simple-image-carousel-with-react.jpeg" title="source: bit.ly/2CtMqAO" >}}

Here we are! Due to my master thesis at the university, one of the requirements is the implementation of an interactive mockup for the university WebTV platform. So, I decided to make it with React.

<!--more-->

Working with the video lists filtered by category encouraged me to use **nuka-carousel**. Though, I used it for one of the cases to complete the task. [Here](https://github.com/FormidableLabs/nuka-carousel) you can have a look closer at the library and figure out how it works.

For another case, because of specific requirements, I needed to code the **custom carousel**. And now I am going to share the outcome solution.

I hope you already guessed to set up a new React application from the [official tutorial](https://reactjs.org/docs/create-a-new-react-app.html).

The next step is to create a new class React component, in my case it is `<Videos />`. Which we are going to import and pass into render-component `<App />`:

```javascript
// App.js

import React, { Component } from 'react';
import {Videos} from './Videos';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Videos />
      </div>
    );
  }
}
export default App;
```

I will skip the styling part and just present the implementation of the logical part, so let’s see what the `<Videos />` component looks like:

```javascript
// Videos.js

import React from 'react';
import arrowRight from './img/arrow-right.svg';
import arrowLeft from './img/arrow-left.svg';
export class Videos extends React.Component {
  constructor() {
    super();
    this.state = {
     // holding the current index for the image that has to be rendered at each time on the screen
     currentImageIndex: 0,
     // array of the source links to the images, simple placeholders for now
        images: [
            'https://via.placeholder.com/200x150?text=first',
            'https://via.placeholder.com/200x150?text=second',
            'https://via.placeholder.com/200x150?text=third',
            'https://via.placeholder.com/200x150?text=fourth',
            'https://via.placeholder.com/200x150?text=fifth',
            'https://via.placeholder.com/200x150?text=sixth',
            'https://via.placeholder.com/200x150?text=seventh',
            'https://via.placeholder.com/200x150?text=eighth',
            'https://via.placeholder.com/200x150?text=ninth',
            'https://via.placeholder.com/200x150?text=tenth'
        ],
     // imported images of right and left arrows
    arrowNext: arrowRight,
    arrowPrev: arrowLeft
 };
...

```

Above I show the data structure assigned to the state of the `<Videos />` component. To change the state — list videos to the right and to the left — I have also bound two methods **prevSlide()** and **nextSlide()**:

```javascript
// Videos.js

 ...
constructor() {
 ...
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
 }
prevSlide() {
 // find the index of the last image in the array
 const lastIndex = this.state.images.length - 1;
 // check if we need to start over from the last index again
 const resetIndex = this.state.currentImageIndex === 0;
 const index = resetIndex ? lastIndex : this.state.currentImageIndex - 1;
// assign the logical index to currentImageIndex that will use in render method
    this.setState({
         currentImageIndex: index
    })
}
nextSlide() {
 // find the index of the last image in the array
 const lastIndex = this.state.images.length - 1;
 // check if we need to start over from the first index
 const resetIndex = this.state.currentImageIndex === lastIndex;
 const index = resetIndex ? 0 : this.state.currentImageIndex + 1;
 // assign the logical index to currentImageIndex that will use in render method
   this.setState({
       currentImageIndex: index
   });
}
```

The logic isn’t complete yet. According to the project requirements the user has to see only 5 videos in the carousel and be able to cycle them over. So, moving on to the **render()** method I have to get a new array of 5 videos in the preview list. Inside the **render()**:

```javascript
// Videos.js
...
render() {
 // get current image index
 const index = this.state.currentImageIndex;
 // create a new array with 5 videos from the source images
 let firstFiveVideo = this.state.images.slice(index, index + 5);
 // check the length of the new array (it’s less than 5 when index is near the end of the array)
 if (firstFiveVideo.length < 5) {
 // if the firstFiveVideo's length is lower than 5 images than append missing images from the beginning of the original array
   firstFiveVideo = firstFiveVideo.concat(this.state.images.slice(0, 5 - firstFiveVideo.length))
 }
return (
   <div>
    // render the left arrow
    <img src={this.state.arrowPrev} onClick={this.prevSlide}/>
    // render images
    {firstFiveVideo.map((image, index) =>
       <img key={index} src={image} alt=""/>
    )}
    // render the right arrow
    <img src={this.state.arrowNext} onClick={this.nextSlide}/>
   </div>
  );
}
```

And that’s it. Below you will find the screenshot of my implementation:

{{< figure src="/blog/images/simple-image-carousel-with-react-result.png" title="" >}}

As I mentioned before, I omitted the styles used for the components, because it was not the purpose of the post. So, it means you are free to apply your own styles to the project 🙂

Thank you for reading!

<br>
This post was originally published on [Medium](https://medium.com/@ilonacodes/simple-image-carousel-with-react-5e20933001bf)

<br>

Cheers,

ilonacodes
