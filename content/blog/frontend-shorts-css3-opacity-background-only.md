+++
css = []
highlight = true
date = "2018-04-23T23:30:05+01:00"
cover = "/blog/images/css3-opacity.png"
title = "Front-end Shorts: CSS3 Opacity - Background Only"
tags = ["react", "css3", "javascript", "frontend", "opacity", "coding", "womenwhocode"]
draft = false
scripts = []
description = "What we do (I mean front-end web developers) isn't all that unique. Often we face the problem that seems easy to solve. However, sometimes we spend hours on finding the solution."
+++

Hi everyone! It's time for a new post.

What we do (I mean front-end web developers) isn't all that unique.
Often we face the problem that seems easy to solve. However, sometimes we spend hours on finding the solution.

In this case, I wanted to change the opacity of the app teaser background color and don't change the opacity of links. I have tried some silly approaches that seemed logical to me, and they all have failed.

In the end, I have found the right way to do that, and I'm going to share it with you.

My solution is to create three `<div>` elements.

One will contain the other two.

The first one is with the transparent background and the second one with the content.

Then I make the container `<div>` position relative. For the `<div>` with the transparent background I set z-index with the negative number.

Finally, I adjust the position of the content to fit over the transparent background.

Voila, there is no issue with absolute positioning.

```html
<!-- index.html -->

<div class="container">
  <div class="opacity"></div>
  <div class="content">Hello, World!</div>
</div>
```

```css
/* index.css */

.container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.content {
  position: absolute;
  width: 100px;
  height: 100px;
  z-index: 1;
  top: 40%;
  left: 5%;
}

.opacity {
  position: absolute;
  width: 100px;
  height: 100px;
  z-index: -1;
  background-color: green;
  opacity: 0.2;
}
```

The `<div>` element with the `container` class should have relative positioning, and absolute for others, so it's possible to move and to adjust them inside the parent `<div>`.

Please keep in mind, that `<div>` with transparent background and the one with the content should not contain each other. These `<div>`'s should be siblings and be children of the container `<div>` element.

We apply the opacity to a separate `<div>` and position the text on top of it.

![Result](/blog/images/css3-opacity.png)

Thank you for reading. Hope these tips help you and your team balance the details with the big picture.
