+++
tags = ["html", "css", "footer", "layout"]
draft = false
date = "2017-07-08T20:25:05+01:00"
scripts = []
css = []
highlight = true
title = "CSS Sticky Footer"
description = "There are a lot of ways how to implement a sticky footer on the page that will always remain at a fixed position on the screen no matter whether the user scroll or not. It will be visible all the time at that specific place (often on bottom). I would like to share my way how I added the sticky footer on my site..."

+++

Hi there!

There are a lot of ways how to implement a sticky footer on the page that will always remain at a fixed position on the screen no matter whether the user scroll or not. It will be visible all the time at that specific place (often on bottom).

I would like to share my way how I added the sticky footer on my site.

Firstly, I added two separated <div> tags inside the body in index.html and thereby assigning two classes .container and .footer to them:

```html
<body>
  <div class="container">
    ...
  </div>

  <div class="footer">
    ...
  </div>
</body>
```  

The next step is creating the CSS styles in the index.css file and styling these two containers from index.html, where .container will get a margin-bottom with the value equal to the size of the .footer:

```css
.container {
  margin-bottom: 60px;
}
```

And then .footer styles will be consisted of the following properties:

```css
.footer {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  margin: 0 auto;
}
```

That's it. I hope this post helped you added a sticky (floating) footer to your site.
