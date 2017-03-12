+++
css = []
highlight = true
title = "How to Center Sign Up Form in 3 Simple Steps"
description = "A couple of days ago I started creating my new project. And I have faced the following problem: I wanted to build a page with Sign Up form, and this page doesn't have any other content.  In that case, it made a lot of sense to center the form, both horizontally and vertically. First of all, I have done some research, tried some solutions, and I want to present what worked for me."
tags = ["css", "html"]
date = "2017-03-12T16:34:40+01:00"
draft = false
scripts = []

+++

Hi, everyone!

I am very happy to welcome you on my blog. A couple of days ago I started creating my new project (that I will have presented to you in a couple of weeks). And I have faced the following problem: I wanted to build a page with Sign Up form, and this page doesn't have any other content.  In that case, it made a lot of sense to center the form, both horizontally and vertically. First of all, I have done some research, tried some solutions, and I want to present what worked for me. 

## Step 1:  Set up correct markup structure

My form had both header and form elements, so I had to wrap it in a "div" container with a particular class so that I can style it:

``` html
<div class="sign-up-form">
    <h1 class="sign-up-title">Sign Up</h1>
    <form>
        <input type="email" placeholder="Email" name="email"/>
        <input type="password" placeholder="Password" name="password"/>
        <input type="submit" value="Continue"/>
    </form>
</div>
```

This container (with class "sign-up-form") is the one that we want to center. Therefore, we need also to wrap it in another container (with class "center-container") inside which we are centering:

```html
<div class="center-container">
    <div class="sign-up-form">
            ...
    </div>
</div>
```  

## Step 2: Preparing the page for centering

The page should occupy the full screen so that we can center the form. That means we need give the page correct size, margins, and paddings:

```css
html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
```

To be able to center the form container we can add "display: table":

```css
html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: table;
}
```

## Step 3: Center the form container

Now we are going to center the form vertically and horizontally:

```css
.center-container {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
```

Also, we have to make the form container of the same size as its content. For that, we can use "display: table" and "margin: 0 auto":

```css
.sign-up-form {
    display: table;
    margin: 0 auto;
}
```

## Conclusion

That's it. Now we can center our sign up form. 

Thank you for reading. 


