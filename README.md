# Shopify

## Naming Convention

Types, Interfaces and Functions should follow Pascal case naming convention while other variables should follow camel case naming convention

## Folder Structure for Backend (NodeJs)

Every code file except for the app.js should fall into any of the following folders

> /controllers : this will contain the components that are specific to that particular route

> /middlewares : this will contain the hooks files that are used by the controllers specific to that route

> /models : this will contain the database schema for each part of the app.

> /routes : this will contain files that serve as routing for the app.

> /utililty : this will contain generic code files that serve the whole app

## How To Use API End points

> Create account { EMAIL, PASSWORD} as post on /user/register
> Sign In { EMAIL, PASSWORD} as post on /user/signin
> add Images -> { EMAIL, TOKEN, IMAGES, PERMISION } on form data