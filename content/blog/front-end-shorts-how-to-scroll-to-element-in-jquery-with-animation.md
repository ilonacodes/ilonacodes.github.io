+++
css = []
highlight = true
date = "2018-03-08T16:30:05+01:00"
title = "Front-end Shorts: How to Scroll to Element in jQuery With Animation"
tags = ["scrolling", "jquery", "javascript", "frontend", "learntocode", "animate", "coding", "letsgetcoding", "womenwhocode"]
draft = false
scripts = []
description = "Here I am back and decided to continue blogging with front-end shorts. The last days I had to work with Javascript and jQuery a lot apart from React and spent much time on creating templates."
+++

Here I am back and decided to continue blogging with front-end shorts. Unfortunately, I don't have enough time to write big posts, but I would be happy to share some frontend tips and tricks that I have already applied for some of my projects.

The last days I had to work with Javascript and jQuery a lot apart from React and spent much time on creating templates. As you know, nowadays modern web pages include animated scrolling, which makes any site look professional and more elegant (instead of simple link element reference in HTML5).

The user story was:

```
When the user clicks on the button,
the page scroll to the specific element with a nice animation.
```

That forced me, to use `jQuery scrollTop animation`.
Assuming there is a button, with the id "button":

```javascript
$("#button").click(function() {
    $('html, body').animate({
        scrollTop: $("#elementToScroll").offset().top
    }, 1000);
});
```
In this case, we are scrolling the height of the element. offset()
return the coordinates of the element relative to the DOM, and top param gives us the element's distance in pixels along the y-axis.

Thank you for reading. I hope you like this small `jQuery animation` tip.
