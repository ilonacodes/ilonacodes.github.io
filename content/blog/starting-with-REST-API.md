+++
tags = ["rest", "api", "ruby", "sinatra", "backend", "client", "server"]
draft = false
date = "2017-07-17T21:45:05+01:00"
scripts = []
css = []
highlight = true
title = "Starting with REST API: Figuring out"
description = "This post is directed at readers that have little experiences to understand the aim of REST API for a product development..."

+++

Today I started doing backend part for my project. It will be written in Ruby language and using Sinatra framework.

This post is directed at readers that have little experiences to understand the aim of REST API for a product development.

Coming back to my project, I had to implement search and preview functionalities. I used a .txt file to describe the REST API precisely and go through it step by step.

As you know, the client talks to the server via the REST API. In my case, the client is a React/Redux app running in the browser.

After analyzing spec features for the application, I understood which methods I need to use when the user clicks the search button and when the user clicks on the search result to preview this photo.

Probably, some of you have already guessed that in both occasions I am going to use GET method for both endpoints. That is because they only are used to request the information from the server, and they don't change the state of the system.

I am still not using the database for storing photos data, so I have to fetch the data from the file system.

```
client (browser or test )
user clicks search
       |
       |
       |
       v
server (sinatra)
GET /search?query=girl
--> 200 OK {
    "search_results": [
        {
            src: "http://localhost:8080/static/girl1.png",
            name: "girl",
            id: 1,
            tags: ["girl", "woman", "blue", "hat", "nature", "smoke", "trees", "hand", "art"]
        },
        {
            src: "http://localhost:8080/static/girl2.png",
            name: "meditation",
            id: 5,
            tags: ["boy", "meditation", "ancient", "girl"]
        }
    ]
}

---

client (browser)
user clicks on the search result (photo) to see the photo preview
       |
       |
       |
       v
server (sinatra)
GET /preview/4
--> 200 OK {
    src: "http://localhost:8080/static/skyscraper.png",
    name: "skyscraper",
    id: 4,
    tags: ["skyscraper", "city", "build"]
}
```

I hope, my plot is readable enough and understandable, so you can get an idea how I am going to implement the request-response interaction between the client application and the server.

Thank you for reading!
