+++
css = []
highlight = true
date = "2018-03-10T20:45:05+01:00"
title = "Front-end Shorts: How to Create Parallax Effect With Vanilla JS"
tags = ["scrolling", "parallax", "javascript", "frontend", "learntocode", "animate", "coding", "letsgetcoding", "womenwhocode"]
draft = false
scripts = []
description = "Recently there are a lot of sites, which have featured with parallax scrolling effect, that represents them in more interactive professionally-made way."
+++

Hi, there! I hope you enjoy your weekend, and ready for a new post.

Recently there are a lot of sites, which have featured with parallax scrolling effect, that represents them in more interactive "professionally-made" way.

This fact made me recreate the effect using Vanilla JavaScript, an example of which you can see below.

Let's a look at the implementation of `parallax effect in Vanilla JavaScript`.

I have used a 'scroll' event on browser 'window,' and retrieved the number of pixels the document is currently scrolled along the vertical axis from 'window.pageYOffset'.

The constant 'background' consists of the image for which we are going to apply the parallax effect.

Finally, I compute the scrolling interval in pixels for the 'top' attribute.

```javascript

    window.addEventListener('scroll', function (e) {
        // will not work on IE < 9
        var scrolled = window.pageYOffset;
        // will not work on IE < 8
        const background = document.querySelector('.background');
        background.style.top = - (scrolled * 0.2) + 'px';
    });

```

Tune the coefficient '0.2' to your liking.

If you liked the article, it would make me happy if you shared it on your favourite social networks!

If you have any questions, suggestions or recommendations feel free to reach out to me [on Twitter](https://twitter.com/ilonacodes).

Happy coding!
