+++
css = []
highlight = true
date = "2019-01-04T10:40:05+01:00"
cover = "/blog/images/what-are-graphql-and-its-schemas.jpg"
title = "What are GraphQL and its schemas"
tags = ["web", "reactjs", "javascript", "graphql", "tech"]
draft = false
scripts = []
description = "The last days I am spending time on learning [GraphQL](https://graphql.org/) and how its clients communicate between frontend and backend application parts."
+++

{{< figure src="/blog/images/what-are-graphql-and-its-schemas.jpg" title="source: Photo by Daniel Cheung on Unsplash" >}}
The last days I am spending time on learning [GraphQL](https://graphql.org/) and how its clients communicate between frontend and backend application parts.

<!--more-->

I understand there are already a lot of exciting posts and tutorials about that technology. However, I would like to share my experience and overviews about it in my Friday post today.

Now I want just to take a moment, go over and answer the question: **what is GraphQL indeed?** It would be helpful to know if you have already heard about that but never worked with it.

Let’s start with the description: GraphQL is a schema language for the API, and it’s also a service type of almost like middleware that sits between the actual web application and the communication to the backend data where this comes from.

To define the API for GraphQL, at first you should create a schema based on the **Schema Definition Language (SDL)** syntax. Also, this schema is often seen as a contract between the server and the client.

For example, I am going to use a GraphQL schema of [SWAPI](https://github.com/graphql/swapi-graphql) (GraphQL API to get the information about the SW’s characters) to explain how the schema is structured:

```
type allPeople {
    totalCount: Int!
    people: [Person!]!
}
```

As you see there are two fields, **'totalCount'** of **Integer** type and **'people'** that is an array of **Person** type objects. The **‘!’** points out that both fields are required and can’t be null.

The second step is to explain the next entity called **Person**. It’s an object that contains many fields, but I will take only the first two fields as an example:

```
type Person {
    name: String!
    gender: String!
}
```

Here the field values are strings. By default in GraphQL spec, the following Scalar types are predefined: Boolean, Integer, String, Float, and ID. There are also other types, but in the example, we have Object types, which based on the object with the custom properties like **Person**.

In this way, we have the relationship between **allPeople** and **Person**.

To fetch the data with the specific query from the server, we are going to use **GraphiQL** - the [GraphQL cloud client](https://graphql.org/swapi-graphql/). There you can read the short manual in comments on how to load the data from the server, then add the query below to the provided editor:

```
{
  allPeople {
    totalCount
    people {
      gender,
      name
    }
  }
}
```

And press **'Play'** button to send this query to the server, that should return a list of all characters of Star Wars as a JSON object:

```
{
  "data": {
    "allPeople": {
      "people": [
        {
          "gender": "male",
          "name": "Luke Skywalker"
        },
        {
          "gender": "n/a",
          "name": "C-3PO"
        },
        {
          "gender": "n/a",
          "name": "R2-D2"
        },
        {
          "gender": "male",
          "name": "Darth Vader"
        },
        {
          "gender": "female",
          "name": "Leia Organa"
        },
…
}
```

Comparing to the REST API approach, which has multiple endpoints and returns fixed data structure, GraphQL API has only single endpoint because the data structure is flexible and allows a frontend client to decide what the kind of the data should be fetched.

The client can query the nested information too following the structure of the types to request the required data. That is a massive advantage of the GraphQL API.

As soon as the schema is defined (created a public contract with a clean public API), that allows frontend and backend teams work without fear to change implementation details either on front-end or back-end without breaking the system stability.

Another benefit is, the frontend teams would be able to test the web application with the mocked up data and then easily load the data from the real server.

You can also learn more about GraphQL as well as searching for best practices which problems GraphQL helps solving.

**Thank you for reading!**

I hope you will find this post useful to try GraphQL and even to dive into this topic more in-depth.

Want to dive deeper into software development? Watch and subscribe for the upcoming “From Frontend to Fullstack Engineer” series on my [YouTube channel](https://www.youtube.com/channel/UCZHUFhQTMcJVekb6KAqqtkg).

Code your best, ilonacodes
