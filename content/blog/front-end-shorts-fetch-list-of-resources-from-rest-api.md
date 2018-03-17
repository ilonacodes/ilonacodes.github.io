+++
css = []
highlight = true
date = "2018-03-17T15:00:05+01:00"
title = "Front-end Shorts: Fetch List of Resources From REST-API"
tags = ["react", "redux", "fetch", "javascript", "frontend", "learntocode", "coding", "letsgetcoding", "womenwhocode"]
draft = false
scripts = []
description = "Today I am going to tell you how to get JSON data from the Rest-API to UI using React+Redux frameworks."
+++

Today I am going to tell you how to get JSON data from the Rest-API to UI using React+Redux frameworks.

In my case, the task looks like:

I have a URL, for example: `https://api.com/v1/expenses/` which will give the following JSON data, and I want to get this data in my UI.

To solve this task, I decided to use JavaScript’s `fetch` method. So in this way, I shouldn't rely on any external libraries (given my target browsers are remotely up-to-date).

What is nice, that by default the fetch method uses `GET` and I don't have to specify any options, however, you can do all that if you want. For further reference: [Fetch API reference](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Response_objects).

Let's look at the following code snippet of my implementation:

```javascript

const loadExpenses = () => {
       fetch('https://api.com/v1/expenses/')
            .then(response => response.json())
            .then(expenses => loadedExpenses(expenses))
};

```

\*loadedExpenses is a function that dispatches action to Redux and then reducer stores the data in the store.

Thank you for reading and have a lovely weekend!
